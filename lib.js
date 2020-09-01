/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

'use strict';

const soajs = require("soajs");
const request = require("request");

const configuration = require(process.env.SOAJS_MAILER_CONFIGURATION);

function checkCaptcha(req, res, cb) {
	let captcha = req.soajs.inputmaskData.captcha;
	if (captcha && captcha !== '') {
		
		let secret_key = configuration.GOOGLE_CAPTCHA_KEY;
		let verificationUrl = configuration.GOOGLE_CAPTCHA_URL + "?secret=" + secret_key + "&response=" + captcha;
		
		request(verificationUrl, (error, response, body) => {
			if (error) {
				req.soajs.log.error(error);
				return res.json(req.soajs.buildResponse({
					code: 400,
					msg: "Unable to send email, please try again later."
				}));
			}
			
			body = JSON.parse(body);
			// Success will be true or false depending upon captcha validation.
			if (body.success) {
				return cb();
			} else {
				return res.json(req.soajs.buildResponse({
					code: 400,
					msg: "Invalid Captcha Message Provided, please try again later."
				}));
			}
		});
	} else {
		return res.json(req.soajs.buildResponse({code: 400, msg: "Missing Captcha Message, please try again later."}));
	}
}

let sendMail = (req, res, data, subject, type, cb) => {
	checkCaptcha(req, res, () => {
		
		let transportConfiguration = configuration.mail.transport || null;
		let mailer = new (soajs.mail)(transportConfiguration);
		
		let mailOptions = {
			'to': configuration.mail.to,
			'from': data.email,
			'subject': subject,
			'data': data,
			'path': ''
		};
		
		switch (type) {
			case 'contribute':
				mailOptions.path = __dirname + "/templates/org/contribute.tmpl";
				break;
			case 'project':
				mailOptions.path = __dirname + "/templates/org/project.tmpl";
				break;
			case 'message':
				mailOptions.path = __dirname + "/templates/org/message.tmpl";
				break;
			case 'herrontech_contact':
				mailOptions.path = __dirname + "/templates/ht/contact.tmpl";
				break;
			
			case 'io_contact':
				mailOptions.path = __dirname + "/templates/io/contact.tmpl";
				break;
			case 'io_demo':
				mailOptions.path = __dirname + "/templates/io/demo.tmpl";
				break;
			case 'io_subscribe':
				mailOptions.path = __dirname + "/templates/io/subscribe.tmpl";
				break;
			
			default:
				return cb({code: 174, msg: "Invalid Mail Type Requested..."});
		}
		
		mailer.send(mailOptions, cb);
	});
};

let corsMW = () => {
	return (req, res, next) => {
		let method = req.method && req.method.toUpperCase && req.method.toUpperCase();
		let origin = '*';
		let credentials = 'true';
		let methods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
		let headers = 'Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
		let maxage = 1728000;
		if (method === 'OPTIONS') {
			res.setHeader('Access-Control-Allow-Origin', origin);
			res.setHeader('Access-Control-Allow-Credentials', credentials);
			res.setHeader('Access-Control-Allow-Methods', methods);
			res.setHeader('Access-Control-Allow-Headers', headers);
			res.setHeader('Access-Control-Max-Age', maxage);
			
			res.statusCode = 204;
			res.end();
		}
		else {
			res.setHeader('Access-Control-Allow-Origin', origin);
			res.setHeader('Access-Control-Allow-Credentials', credentials);
			res.setHeader('Access-Control-Expose-Headers', headers);
			next();
		}
	};
};


module.exports = {
	"sendMail": sendMail,
	"corsMW": corsMW
};