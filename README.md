# Forge API Reference (FAR) server

Node.js server to help authenticate API access for browser-based apps. Helper for [FAR client](https://far.rosano.ca).

First, set `FAR_SECRETS` in `.env` to the following case-sensitive format for API secrets:

```bash
FAR_SECRETS="github.com YOUR_GITHUB_API_SECRET,codeberg.org YOUR_CODEBERG_API_SECRET"
```

Then FAR server will map requests to `far-server-domain.com/https://github.com/login/oauth/access_token` to `https://github.com/login/oauth/access_token` (server-side) while passing your secret via the `client_secret` parameter.

---

Dockerfiles are for [easy](https://easyindie.app) deployment to [Cloudron](cloudron.io) and [Caprover](https://caprover.com).
