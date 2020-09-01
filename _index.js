'use strict';

/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

const soajs = require('soajs');

let config = require('./config.js');
config.packagejson = require("./package.json");

const lib = require("./lib.js");

const service = new soajs.server.service(config);


function checkIfError(req, res, data, cb) {
	return data.check ? res.json(req.soajs.buildResponse({code: data.code, msg: data.error})) : cb();
}

function run(serviceStartCb) {
	service.init(() => {
		
		service.app.use(lib.corsMW());
		
		//https://api.soajs.org/soajsorg/...
		service.post("/soajsorg/sendMessage", (req, res) => {
			let data = req.soajs.inputmaskData;
			lib.sendMail(req, res, data, 'New Email from SOAJS Website', 'message', (error) => {
				let data = {
					"check": error,
					"code": 401,
					"error": config.errors[401]
				};
				checkIfError(req, res, data, () => {
					return res.json(req.soajs.buildResponse(null, true));
				});
			});
		});
		
		service.post("/soajsorg/sendProject", (req, res) => {
			let data = req.soajs.inputmaskData;
			lib.sendMail(req, res, data, 'New Project from SOAJS Website', 'project', (error) => {
				let data = {
					"check": error,
					"code": 401,
					"error": config.errors[401]
				};
				checkIfError(req, res, data, () => {
					return res.json(req.soajs.buildResponse(null, true));
				});
			});
		});
		
		service.post("/soajsorg/sendContribute", (req, res) => {
			let data = req.soajs.inputmaskData;
			data.product = data.product.join(" - ");
			lib.sendMail(req, res, data, 'New Contributor from SOAJS Website', 'contribute', (error) => {
				let data = {
					"check": error,
					"code": 401,
					"error": config.errors[401]
				};
				checkIfError(req, res, data, () => {
					return res.json(req.soajs.buildResponse(null, true));
				});
			});
		});
		
		//https://api.herrontech.com/herrontech/contact
		service.post("/herrontech/contact", (req, res) => {
			let data = req.soajs.inputmaskData;
			lib.sendMail(req, res, data, "New Email from Herron Tech Website", 'herrontech_contact', (error) => {
				let data = {
					"check": error,
					"code": 401,
					"error": config.errors[401]
				};
				checkIfError(req, res, data, () => {
					return res.json(req.soajs.buildResponse(null, true));
				});
			});
		});
		
		//https://api.soajs.io/io/...
		service.post("/io/sendMessage", (req, res) => {
			let data = req.soajs.inputmaskData;
			lib.sendMail(req, res, data, "New Email from SOAJS.io", 'io_contact', (error) => {
				let data = {
					"check": error,
					"code": 401,
					"error": config.errors[401]
				};
				checkIfError(req, res, data, () => {
					return res.json(req.soajs.buildResponse(null, true));
				});
			});
		});
		
		service.post("/io/sendRequest", (req, res) => {
			let data = req.soajs.inputmaskData;
			lib.sendMail(req, res, data, "New Demo Request from SOAJS.io", 'io_demo', (error) => {
				let data = {
					"check": error,
					"code": 401,
					"error": config.errors[401]
				};
				checkIfError(req, res, data, () => {
					return res.json(req.soajs.buildResponse(null, true));
				});
			});
		});
		
		service.post("/io/subscribe", (req, res) => {
			
			let data = req.soajs.inputmaskData;
			lib.sendMail(req, res, data, "New Subscription to SOAJS.io Newsletter", 'io_subscribe', (error) => {
				let data = {
					"check": error,
					"code": 401,
					"error": config.errors[401]
				};
				checkIfError(req, res, data, () => {
					return res.json(req.soajs.buildResponse(null, true));
				});
			});
		});
		
		service.start(serviceStartCb);
	});
}

function stop(serviceStopCb) {
	service.stop(serviceStopCb);
}

module.exports = {
	"runService": (serviceStartCb) => {
		if (serviceStartCb && typeof serviceStartCb === "function") {
			run(serviceStartCb);
		} else {
			run(null);
		}
	},
	"stopService": (serviceStopCb) => {
		if (serviceStopCb && typeof serviceStopCb === "function") {
			stop(serviceStopCb);
		} else {
			stop(null);
		}
	}
};