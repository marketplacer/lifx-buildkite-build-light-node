# LIFX Buildkite Build Light (TypeScript & Lambda)

An Node.js [Buildkite](https://buildkite.com/) webhook endpoint for creating a [LIFX](https://lifx.com/) powered build light.

:v::panda_face::v:

![LIFX panda build light in action](http://i.imgur.com/FrBTgnf.gif)

## Usage


### Set up Secrets

1. Create a new webhook notification in Buildkite at https://buildkite.com/organizations/YOUR_ORG_SLUG_HERE/services/webhook/new
2. Choose `build.running` and `build.finished` events only.
3. Save the token into your `.envrc` file: `export BUILDKITE_WEBHOOK_TOKEN=token-here`
4. Grab your LIFX API key, and save it similarly: `export LIFX_ACCESS_TOKEN=token-here`
5. Save your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in the same fashion.
6. Set your `BULB_SELECTOR` variable. If you're okay with affecting all lights, this can just be `ALL`.


### Deploy

1. **Deploy it to AWS:** `serverless deploy`
2. Note the API Gateway URL produced. Copy that into the Buildkite "Webhook URL" field, appending `/buildkite`.

## Personalising

One bulb per project? One bulb per build pipeline step? A LIFX chandelier that twinkles rainbows after each deploy? The possibilities are endless!

Check out [api.developer.lifx.com](http://api.developer.lifx.com) to see what’s possible with the API, then fork this project, and get hacking.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
