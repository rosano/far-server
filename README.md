# Forge API Reference (FAR) server

Node.js server to help authenticate API access for browser-based apps.

First, set `FAR_SECRETS` to the following case-sensitive format for API secrets:

```bash
FAR_SECRETS="github.com YOUR_GITHUB_API_SECRET,codeberg.org YOUR_CODEBERG_API_SECRET"
```

Then FAR server will map requests to `far-server-domain.com/https://github.com/login/oauth/access_token` to `https://github.com/login/oauth/access_token` (server-side) while passing your secret via the `client_secret` parameter.

Make sure to register your FAR server (`https://far-server-domain.com`) as a redirect/callback URI in each Oauth app.

---

Dockerfiles are for [easy](https://easyindie.app) deployment to [Cloudron](cloudron.io) and [Caprover](https://caprover.com).
