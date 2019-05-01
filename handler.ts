import axios from 'axios'
import { APIGatewayProxyEvent } from 'aws-lambda'

/** Return a message to the client */
const send = (body: any, statusCode: number = 200) => ({
  statusCode,
  body: JSON.stringify(body)
})

const client = axios.create({
  baseURL: `https://api.lifx.com/v1beta1/lights/${process.env.BULB_SELECTOR}/effects/`,
  headers: {
    Authorization: `Bearer ${process.env.LIFX_ACCESS_TOKEN}`
  }
})

export const checkBuild = async ({ headers, body: rawBody }: APIGatewayProxyEvent) => {
  if (headers['X-Buildkite-Token'] !== process.env.BUILDKITE_WEBHOOK_TOKEN) {
    console.log(
      process.env.BUILDKITE_WEBHOOK_TOKEN,
      headers['X-Buildkite-Token']
    )
    return send({ message: 'Unauthorized' }, 401)
  }

  const body = JSON.parse(rawBody)
  const buildkiteEvent = headers['X-Buildkite-Event']

  if (buildkiteEvent === 'build.running') {
    console.log('Build running')
    await client.post('breathe.json', {
      power_on: false,
      color: 'yellow brightness:5%',
      from_color: 'yellow brightness:35%',
      period: 5,
      cycles: 9999,
      persist: true
    })
  }

  if (buildkiteEvent === 'build.finished') {
    if (body.build.state === 'passed') {
      console.log('Build passed')
      await client.post('breathe.json', {
        power_on: false,
        color: 'green brightness:75%',
        from_color: 'green brightness:10%',
        period: 0.45,
        cycles: 3,
        persist: true,
        peak: 0.2
      })
    } else {
      console.log('Build failed')
      await client.post('breathe.json', {
        power_on: false,
        color: 'red brightness:60%',
        from_color: 'red brightness:25%',
        period: 0.1,
        cycles: 20,
        persist: true,
        peak: 0.2
      })
    }
  }

  return send({ message: 'AOK' })
}
