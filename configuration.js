'use strict';
module.exports = {
	"GOOGLE_CAPTCHA_KEY": "",
	"GOOGLE_CAPTCHA_URL": "https://www.google.com/recaptcha/api/siteverify",
	"mail": {
		"from": "antoine@soajs.org",
		"transport": {
			"type": "smtp",
			"options": {
				"host": "",
				"port": 587,
				"auth": {
					"user": "",
					"pass": ""
				}
			}
		},
		"to": "team@soajs.org"
	}
};