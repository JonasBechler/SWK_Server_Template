

module.exports = function (config, userDataPath) {

	const express = require("express");
	const cors = require('cors')
	const cookieParser = require('cookie-parser');
	const bodyParser = require('body-parser');
	const session = require('express-session');

	var app = express();

	// to allow cors?
	// lets us make cross-origin requests without annoying errors telling us we’re not allowed to
	app.use(cors({
		origin: true,
		credentials: true
	}));

	app.use(cookieParser());

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// configure sessions
	app.use(session(
		{
			secret: '1234567890',
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: 'auto',
				httpOnly: true,
				maxAge: 3600000
			}
		})
	);

	app.use((req, res, next) => {

		console.log(req.originalUrl);
		next();

	});

	// app.use(express.static(frontend_dir));
	// app.use(express.static("public"));

	app.use('/api/user', require('./routes/user')(config, userDataPath));
	app.use('/api/login', require('./routes/login')(config, userDataPath));
	app.use('/api/register', require('./routes/register')(config, userDataPath));
	app.use('/api/logout', require('./routes/logout')(config, userDataPath));
	app.use('/api/login_kn', require('./routes/login_fusionauth')(config, userDataPath));
	app.use('/oauth_callback', require('./routes/callback_fusionauth')(config, userDataPath));

	app.use('/', (req, res, next) => {
		res.redirect(`${config.device_ip}:${config.port_react}`)
		// res.sendFile(path.join(frontend_dir, "index.html"));
		return
	})

	return app
}


