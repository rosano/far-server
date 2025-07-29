const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config({ quiet: true })

app.use(async (req, res) => {
	const secrets = (process.env.FAR_SECRETS || '').split(',').filter(e => !!e)

	if (!secrets.length) {
		return res.send('Please set FAR_SECRETS in .env to the format "domain client_secret,domain client_secret", then restart.')
	}

	let url = req.path.slice(1);

	if (!url.match(/^https?:\/\/.*/)) {
		return res.send('missing URL');
	}

	const client_secret = Object.fromEntries(secrets.map(e => e.split(' ')))[(new URL(url)).hostname];

	if (client_secret) {
		Object.assign(req.body, {
			client_secret,
		})
	}

	const params = new URLSearchParams(req.body);

	if (req.method === 'GET') {
		url = url.concat('?', params);
	}

	return await res.json(await (await fetch(url, {
		method: req.method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': req.get('Authorization'),
		},
		body: req.method === 'GET' ? undefined : params,
	})).json());
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.info(`Listening on port ${ port }`)
})