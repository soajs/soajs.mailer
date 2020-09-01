/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

'use strict';

module.exports = {
	"type": "service",
	"serviceName": "contactUs",
	"servicePort": 4995,
	"errors": {
		"401": "Failed to send email"
	},
	"mail": {
		"to": process.env.SOAJS_MAIL_TO,
		"subject": "Message from SOAJS Website Contact Us Section",
		"transport": {
			"type": "smtp",
			"options": {
				"service": "gmail",
				"auth": {
					"user": process.env.SOAJS_MAIL_USER,
					"pass": process.env.SOAJS_MAIL_PASS
				}
			}
		}
	},
	"schema": {
		"post": {
			"/soajsorg/sendMessage": {
				"_apiInfo": {
					"l": "Send message",
					"group": "Contact Us"
				},
				"name": {
					"source": ['body.name'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"purpose": {
					"source": ['body.purpose'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"email": {
					"source": ['body.email'],
					"required": true,
					"validation": {
						"type": "string",
						"format": "email"
					}
				},
				"message": {
					"source": ['body.message'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"captcha": {
					"source": ['body.captcha'],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			},
			"/soajsorg/sendProject": {
				"_apiInfo": {
					"l": "Send Project",
					"group": "Contact Us"
				},
				"name": {
					"source": ['body.name'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"phone": {
					"source": ['body.phone'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"email": {
					"source": ['body.email'],
					"required": true,
					"validation": {
						"type": "string",
						"format": "email"
					}
				},
				"address": {
					"source": ['body.address'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"company": {
					"source": ['body.company'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"message": {
					"source": ['body.message'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"captcha": {
					"source": ['body.captcha'],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			},
			"/soajsorg/sendContribute": {
				"_apiInfo": {
					"l": "Send Contribute",
					"group": "Contact Us"
				},
				"name": {
					"source": ['body.name'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"location": {
					"source": ['body.location'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"email": {
					"source": ['body.email'],
					"required": true,
					"validation": {
						"type": "string",
						"format": "email"
					}
				},
				"github": {
					"source": ['body.github'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"product": {
					"source": ['body.product'],
					"required": true,
					"validation": {
						"type": "array",
						"items": {
							"type": "string",
							"enum": ["SOAJS", "Dashboard", "Controller"]
						}
					}
				},
				"message": {
					"source": ['body.message'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"captcha": {
					"source": ['body.captcha'],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			},
			
			"/herrontech/contact": {
				"_apiInfo": {
					"l": "Contact Herrontech",
					"group": "Mail"
				},
				"name": {
					"source": ["body.name"],
					"required": true,
					"validation": {"type": "string", "required": true}
				},
				"email": {
					"source": ["body.email"],
					"required": true,
					"validation": {"type": "string", "required": true, "format": "email"}
				},
				"captcha": {
					"source": ["body.captcha"],
					"required": true,
					"validation": {"type": "string", "required": true}
				},
				"message": {
					"source": ["body.message"],
					"required": true,
					"validation": {"type": "string", "required": true}
				}
			},
			
			"/io/sendMessage": {
				"_apiInfo": {
					"l": "Send message from IO",
					"group": "Contact Us"
				},
				"name": {
					"source": ['body.name'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"email": {
					"source": ['body.email'],
					"required": true,
					"validation": {
						"type": "string",
						"format": "email"
					}
				},
				"phone": {
					"source": ['body.phone'],
					"required": false,
					"validation": {
						"type": "string"
					}
				},
				"company": {
					"source": ['body.company'],
					"required": false,
					"validation": {
						"type": "string"
					}
				},
				"message": {
					"source": ['body.message'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"captcha": {
					"source": ['body.captcha'],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			},
			"/io/sendRequest": {
				"_apiInfo": {
					"l": "Send Demo Request",
					"group": "Contact Us"
				},
				"name": {
					"source": ['body.name'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"email": {
					"source": ['body.email'],
					"required": true,
					"validation": {
						"type": "string",
						"format": "email"
					}
				},
				"phone": {
					"source": ['body.phone'],
					"required": false,
					"validation": {
						"type": "string"
					}
				},
				"company": {
					"source": ['body.company'],
					"required": false,
					"validation": {
						"type": "string"
					}
				},
				"message": {
					"source": ['body.message'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"captcha": {
					"source": ['body.captcha'],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			},
			"/io/subscribe": {
				"_apiInfo": {
					"l": "Send Contribute",
					"group": "Contact Us"
				},
				"name": {
					"source": ['body.name'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"email": {
					"source": ['body.email'],
					"required": true,
					"validation": {
						"type": "string",
						"format": "email"
					}
				},
				"captcha": {
					"source": ['body.captcha'],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			}
		}
	}
};