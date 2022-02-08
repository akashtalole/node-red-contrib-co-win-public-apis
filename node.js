'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function CoWinPublicApisNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.generateOTP_body = config.generateOTP_body;
        this.generateOTP_bodyType = config.generateOTP_bodyType || 'str';
        this.confirmOTP_body = config.confirmOTP_body;
        this.confirmOTP_bodyType = config.confirmOTP_bodyType || 'str';
        this.states_acceptLanguage = config.states_acceptLanguage;
        this.states_acceptLanguageType = config.states_acceptLanguageType || 'str';
        this.districts_acceptLanguage = config.districts_acceptLanguage;
        this.districts_acceptLanguageType = config.districts_acceptLanguageType || 'str';
        this.districts_stateId = config.districts_stateId;
        this.districts_stateIdType = config.districts_stateIdType || 'str';
        this.findByPin_acceptLanguage = config.findByPin_acceptLanguage;
        this.findByPin_acceptLanguageType = config.findByPin_acceptLanguageType || 'str';
        this.findByPin_pincode = config.findByPin_pincode;
        this.findByPin_pincodeType = config.findByPin_pincodeType || 'str';
        this.findByPin_date = config.findByPin_date;
        this.findByPin_dateType = config.findByPin_dateType || 'str';
        this.findByDistrict_acceptLanguage = config.findByDistrict_acceptLanguage;
        this.findByDistrict_acceptLanguageType = config.findByDistrict_acceptLanguageType || 'str';
        this.findByDistrict_districtId = config.findByDistrict_districtId;
        this.findByDistrict_districtIdType = config.findByDistrict_districtIdType || 'str';
        this.findByDistrict_date = config.findByDistrict_date;
        this.findByDistrict_dateType = config.findByDistrict_dateType || 'str';
        this.findByLatLong_acceptLanguage = config.findByLatLong_acceptLanguage;
        this.findByLatLong_acceptLanguageType = config.findByLatLong_acceptLanguageType || 'str';
        this.findByLatLong_lat = config.findByLatLong_lat;
        this.findByLatLong_latType = config.findByLatLong_latType || 'str';
        this.findByLatLong_long = config.findByLatLong_long;
        this.findByLatLong_longType = config.findByLatLong_longType || 'str';
        this.calendarByPin_acceptLanguage = config.calendarByPin_acceptLanguage;
        this.calendarByPin_acceptLanguageType = config.calendarByPin_acceptLanguageType || 'str';
        this.calendarByPin_pincode = config.calendarByPin_pincode;
        this.calendarByPin_pincodeType = config.calendarByPin_pincodeType || 'str';
        this.calendarByPin_date = config.calendarByPin_date;
        this.calendarByPin_dateType = config.calendarByPin_dateType || 'str';
        this.calendarByDistrict_acceptLanguage = config.calendarByDistrict_acceptLanguage;
        this.calendarByDistrict_acceptLanguageType = config.calendarByDistrict_acceptLanguageType || 'str';
        this.calendarByDistrict_districtId = config.calendarByDistrict_districtId;
        this.calendarByDistrict_districtIdType = config.calendarByDistrict_districtIdType || 'str';
        this.calendarByDistrict_date = config.calendarByDistrict_date;
        this.calendarByDistrict_dateType = config.calendarByDistrict_dateType || 'str';
        this.calendarByCenter_acceptLanguage = config.calendarByCenter_acceptLanguage;
        this.calendarByCenter_acceptLanguageType = config.calendarByCenter_acceptLanguageType || 'str';
        this.calendarByCenter_centerId = config.calendarByCenter_centerId;
        this.calendarByCenter_centerIdType = config.calendarByCenter_centerIdType || 'str';
        this.calendarByCenter_date = config.calendarByCenter_date;
        this.calendarByCenter_dateType = config.calendarByCenter_dateType || 'str';
        this.download_beneficiaryReferenceId = config.download_beneficiaryReferenceId;
        this.download_beneficiaryReferenceIdType = config.download_beneficiaryReferenceIdType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client = new lib.CoWinPublicApis();
            if (!errorFlag && this.service && this.service.credentials && this.service.credentials.secureApiKeyValue) {
                if (this.service.secureApiKeyIsQuery) {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                                     this.service.secureApiKeyHeaderOrQueryName, true);
                } else {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                                     this.service.secureApiKeyHeaderOrQueryName, false);
                }
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'generateOTP') {
                var generateOTP_parameters = [];
                var generateOTP_nodeParam;
                var generateOTP_nodeParamType;

                if (typeof msg.payload === 'object') {
                    generateOTP_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.generateOTP(generateOTP_parameters);
            }
            if (!errorFlag && node.method === 'confirmOTP') {
                var confirmOTP_parameters = [];
                var confirmOTP_nodeParam;
                var confirmOTP_nodeParamType;

                if (typeof msg.payload === 'object') {
                    confirmOTP_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.confirmOTP(confirmOTP_parameters);
            }
            if (!errorFlag && node.method === 'states') {
                var states_parameters = [];
                var states_nodeParam;
                var states_nodeParamType;

                states_nodeParam = node.states_acceptLanguage;
                states_nodeParamType = node.states_acceptLanguageType;
                if (states_nodeParamType === 'str') {
                    states_parameters.acceptLanguage = states_nodeParam || '';
                } else {
                    states_parameters.acceptLanguage = RED.util.getMessageProperty(msg, states_nodeParam);
                }
                states_parameters.acceptLanguage = !!states_parameters.acceptLanguage ? states_parameters.acceptLanguage : msg.payload;
                                result = client.states(states_parameters);
            }
            if (!errorFlag && node.method === 'districts') {
                var districts_parameters = [];
                var districts_nodeParam;
                var districts_nodeParamType;

                districts_nodeParam = node.districts_acceptLanguage;
                districts_nodeParamType = node.districts_acceptLanguageType;
                if (districts_nodeParamType === 'str') {
                    districts_parameters.acceptLanguage = districts_nodeParam || '';
                } else {
                    districts_parameters.acceptLanguage = RED.util.getMessageProperty(msg, districts_nodeParam);
                }
                districts_parameters.acceptLanguage = !!districts_parameters.acceptLanguage ? districts_parameters.acceptLanguage : msg.payload;
                
                districts_nodeParam = node.districts_stateId;
                districts_nodeParamType = node.districts_stateIdType;
                if (districts_nodeParamType === 'str') {
                    districts_parameters.stateId = districts_nodeParam || '';
                } else {
                    districts_parameters.stateId = RED.util.getMessageProperty(msg, districts_nodeParam);
                }
                districts_parameters.stateId = !!districts_parameters.stateId ? districts_parameters.stateId : msg.payload;
                                result = client.districts(districts_parameters);
            }
            if (!errorFlag && node.method === 'findByPin') {
                var findByPin_parameters = [];
                var findByPin_nodeParam;
                var findByPin_nodeParamType;

                findByPin_nodeParam = node.findByPin_acceptLanguage;
                findByPin_nodeParamType = node.findByPin_acceptLanguageType;
                if (findByPin_nodeParamType === 'str') {
                    findByPin_parameters.acceptLanguage = findByPin_nodeParam || '';
                } else {
                    findByPin_parameters.acceptLanguage = RED.util.getMessageProperty(msg, findByPin_nodeParam);
                }
                findByPin_parameters.acceptLanguage = !!findByPin_parameters.acceptLanguage ? findByPin_parameters.acceptLanguage : msg.payload;
                
                findByPin_nodeParam = node.findByPin_pincode;
                findByPin_nodeParamType = node.findByPin_pincodeType;
                if (findByPin_nodeParamType === 'str') {
                    findByPin_parameters.pincode = findByPin_nodeParam || '';
                } else {
                    findByPin_parameters.pincode = RED.util.getMessageProperty(msg, findByPin_nodeParam);
                }
                findByPin_parameters.pincode = !!findByPin_parameters.pincode ? findByPin_parameters.pincode : msg.payload;
                
                findByPin_nodeParam = node.findByPin_date;
                findByPin_nodeParamType = node.findByPin_dateType;
                if (findByPin_nodeParamType === 'str') {
                    findByPin_parameters.date = findByPin_nodeParam || '';
                } else {
                    findByPin_parameters.date = RED.util.getMessageProperty(msg, findByPin_nodeParam);
                }
                findByPin_parameters.date = !!findByPin_parameters.date ? findByPin_parameters.date : msg.payload;
                                result = client.findByPin(findByPin_parameters);
            }
            if (!errorFlag && node.method === 'findByDistrict') {
                var findByDistrict_parameters = [];
                var findByDistrict_nodeParam;
                var findByDistrict_nodeParamType;

                findByDistrict_nodeParam = node.findByDistrict_acceptLanguage;
                findByDistrict_nodeParamType = node.findByDistrict_acceptLanguageType;
                if (findByDistrict_nodeParamType === 'str') {
                    findByDistrict_parameters.acceptLanguage = findByDistrict_nodeParam || '';
                } else {
                    findByDistrict_parameters.acceptLanguage = RED.util.getMessageProperty(msg, findByDistrict_nodeParam);
                }
                findByDistrict_parameters.acceptLanguage = !!findByDistrict_parameters.acceptLanguage ? findByDistrict_parameters.acceptLanguage : msg.payload;
                
                findByDistrict_nodeParam = node.findByDistrict_districtId;
                findByDistrict_nodeParamType = node.findByDistrict_districtIdType;
                if (findByDistrict_nodeParamType === 'str') {
                    findByDistrict_parameters.districtId = findByDistrict_nodeParam || '';
                } else {
                    findByDistrict_parameters.districtId = RED.util.getMessageProperty(msg, findByDistrict_nodeParam);
                }
                findByDistrict_parameters.districtId = !!findByDistrict_parameters.districtId ? findByDistrict_parameters.districtId : msg.payload;
                
                findByDistrict_nodeParam = node.findByDistrict_date;
                findByDistrict_nodeParamType = node.findByDistrict_dateType;
                if (findByDistrict_nodeParamType === 'str') {
                    findByDistrict_parameters.date = findByDistrict_nodeParam || '';
                } else {
                    findByDistrict_parameters.date = RED.util.getMessageProperty(msg, findByDistrict_nodeParam);
                }
                findByDistrict_parameters.date = !!findByDistrict_parameters.date ? findByDistrict_parameters.date : msg.payload;
                                result = client.findByDistrict(findByDistrict_parameters);
            }
            if (!errorFlag && node.method === 'findByLatLong') {
                var findByLatLong_parameters = [];
                var findByLatLong_nodeParam;
                var findByLatLong_nodeParamType;

                findByLatLong_nodeParam = node.findByLatLong_acceptLanguage;
                findByLatLong_nodeParamType = node.findByLatLong_acceptLanguageType;
                if (findByLatLong_nodeParamType === 'str') {
                    findByLatLong_parameters.acceptLanguage = findByLatLong_nodeParam || '';
                } else {
                    findByLatLong_parameters.acceptLanguage = RED.util.getMessageProperty(msg, findByLatLong_nodeParam);
                }
                findByLatLong_parameters.acceptLanguage = !!findByLatLong_parameters.acceptLanguage ? findByLatLong_parameters.acceptLanguage : msg.payload;
                
                findByLatLong_nodeParam = node.findByLatLong_lat;
                findByLatLong_nodeParamType = node.findByLatLong_latType;
                if (findByLatLong_nodeParamType === 'str') {
                    findByLatLong_parameters.lat = findByLatLong_nodeParam || '';
                } else {
                    findByLatLong_parameters.lat = RED.util.getMessageProperty(msg, findByLatLong_nodeParam);
                }
                findByLatLong_parameters.lat = !!findByLatLong_parameters.lat ? findByLatLong_parameters.lat : msg.payload;
                
                findByLatLong_nodeParam = node.findByLatLong_long;
                findByLatLong_nodeParamType = node.findByLatLong_longType;
                if (findByLatLong_nodeParamType === 'str') {
                    findByLatLong_parameters.long = findByLatLong_nodeParam || '';
                } else {
                    findByLatLong_parameters.long = RED.util.getMessageProperty(msg, findByLatLong_nodeParam);
                }
                findByLatLong_parameters.long = !!findByLatLong_parameters.long ? findByLatLong_parameters.long : msg.payload;
                                result = client.findByLatLong(findByLatLong_parameters);
            }
            if (!errorFlag && node.method === 'calendarByPin') {
                var calendarByPin_parameters = [];
                var calendarByPin_nodeParam;
                var calendarByPin_nodeParamType;

                calendarByPin_nodeParam = node.calendarByPin_acceptLanguage;
                calendarByPin_nodeParamType = node.calendarByPin_acceptLanguageType;
                if (calendarByPin_nodeParamType === 'str') {
                    calendarByPin_parameters.acceptLanguage = calendarByPin_nodeParam || '';
                } else {
                    calendarByPin_parameters.acceptLanguage = RED.util.getMessageProperty(msg, calendarByPin_nodeParam);
                }
                calendarByPin_parameters.acceptLanguage = !!calendarByPin_parameters.acceptLanguage ? calendarByPin_parameters.acceptLanguage : msg.payload;
                
                calendarByPin_nodeParam = node.calendarByPin_pincode;
                calendarByPin_nodeParamType = node.calendarByPin_pincodeType;
                if (calendarByPin_nodeParamType === 'str') {
                    calendarByPin_parameters.pincode = calendarByPin_nodeParam || '';
                } else {
                    calendarByPin_parameters.pincode = RED.util.getMessageProperty(msg, calendarByPin_nodeParam);
                }
                calendarByPin_parameters.pincode = !!calendarByPin_parameters.pincode ? calendarByPin_parameters.pincode : msg.payload;
                
                calendarByPin_nodeParam = node.calendarByPin_date;
                calendarByPin_nodeParamType = node.calendarByPin_dateType;
                if (calendarByPin_nodeParamType === 'str') {
                    calendarByPin_parameters.date = calendarByPin_nodeParam || '';
                } else {
                    calendarByPin_parameters.date = RED.util.getMessageProperty(msg, calendarByPin_nodeParam);
                }
                calendarByPin_parameters.date = !!calendarByPin_parameters.date ? calendarByPin_parameters.date : msg.payload;
                                result = client.calendarByPin(calendarByPin_parameters);
            }
            if (!errorFlag && node.method === 'calendarByDistrict') {
                var calendarByDistrict_parameters = [];
                var calendarByDistrict_nodeParam;
                var calendarByDistrict_nodeParamType;

                calendarByDistrict_nodeParam = node.calendarByDistrict_acceptLanguage;
                calendarByDistrict_nodeParamType = node.calendarByDistrict_acceptLanguageType;
                if (calendarByDistrict_nodeParamType === 'str') {
                    calendarByDistrict_parameters.acceptLanguage = calendarByDistrict_nodeParam || '';
                } else {
                    calendarByDistrict_parameters.acceptLanguage = RED.util.getMessageProperty(msg, calendarByDistrict_nodeParam);
                }
                calendarByDistrict_parameters.acceptLanguage = !!calendarByDistrict_parameters.acceptLanguage ? calendarByDistrict_parameters.acceptLanguage : msg.payload;
                
                calendarByDistrict_nodeParam = node.calendarByDistrict_districtId;
                calendarByDistrict_nodeParamType = node.calendarByDistrict_districtIdType;
                if (calendarByDistrict_nodeParamType === 'str') {
                    calendarByDistrict_parameters.districtId = calendarByDistrict_nodeParam || '';
                } else {
                    calendarByDistrict_parameters.districtId = RED.util.getMessageProperty(msg, calendarByDistrict_nodeParam);
                }
                calendarByDistrict_parameters.districtId = !!calendarByDistrict_parameters.districtId ? calendarByDistrict_parameters.districtId : msg.payload;
                
                calendarByDistrict_nodeParam = node.calendarByDistrict_date;
                calendarByDistrict_nodeParamType = node.calendarByDistrict_dateType;
                if (calendarByDistrict_nodeParamType === 'str') {
                    calendarByDistrict_parameters.date = calendarByDistrict_nodeParam || '';
                } else {
                    calendarByDistrict_parameters.date = RED.util.getMessageProperty(msg, calendarByDistrict_nodeParam);
                }
                calendarByDistrict_parameters.date = !!calendarByDistrict_parameters.date ? calendarByDistrict_parameters.date : msg.payload;
                                result = client.calendarByDistrict(calendarByDistrict_parameters);
            }
            if (!errorFlag && node.method === 'calendarByCenter') {
                var calendarByCenter_parameters = [];
                var calendarByCenter_nodeParam;
                var calendarByCenter_nodeParamType;

                calendarByCenter_nodeParam = node.calendarByCenter_acceptLanguage;
                calendarByCenter_nodeParamType = node.calendarByCenter_acceptLanguageType;
                if (calendarByCenter_nodeParamType === 'str') {
                    calendarByCenter_parameters.acceptLanguage = calendarByCenter_nodeParam || '';
                } else {
                    calendarByCenter_parameters.acceptLanguage = RED.util.getMessageProperty(msg, calendarByCenter_nodeParam);
                }
                calendarByCenter_parameters.acceptLanguage = !!calendarByCenter_parameters.acceptLanguage ? calendarByCenter_parameters.acceptLanguage : msg.payload;
                
                calendarByCenter_nodeParam = node.calendarByCenter_centerId;
                calendarByCenter_nodeParamType = node.calendarByCenter_centerIdType;
                if (calendarByCenter_nodeParamType === 'str') {
                    calendarByCenter_parameters.centerId = calendarByCenter_nodeParam || '';
                } else {
                    calendarByCenter_parameters.centerId = RED.util.getMessageProperty(msg, calendarByCenter_nodeParam);
                }
                calendarByCenter_parameters.centerId = !!calendarByCenter_parameters.centerId ? calendarByCenter_parameters.centerId : msg.payload;
                
                calendarByCenter_nodeParam = node.calendarByCenter_date;
                calendarByCenter_nodeParamType = node.calendarByCenter_dateType;
                if (calendarByCenter_nodeParamType === 'str') {
                    calendarByCenter_parameters.date = calendarByCenter_nodeParam || '';
                } else {
                    calendarByCenter_parameters.date = RED.util.getMessageProperty(msg, calendarByCenter_nodeParam);
                }
                calendarByCenter_parameters.date = !!calendarByCenter_parameters.date ? calendarByCenter_parameters.date : msg.payload;
                                result = client.calendarByCenter(calendarByCenter_parameters);
            }
            if (!errorFlag && node.method === 'download') {
                var download_parameters = [];
                var download_nodeParam;
                var download_nodeParamType;

                download_nodeParam = node.download_beneficiaryReferenceId;
                download_nodeParamType = node.download_beneficiaryReferenceIdType;
                if (download_nodeParamType === 'str') {
                    download_parameters.beneficiaryReferenceId = download_nodeParam || '';
                } else {
                    download_parameters.beneficiaryReferenceId = RED.util.getMessageProperty(msg, download_nodeParam);
                }
                download_parameters.beneficiaryReferenceId = !!download_parameters.beneficiaryReferenceId ? download_parameters.beneficiaryReferenceId : msg.payload;
                                result = client.download(download_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'CoWinPublicApis.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('co-win-public-apis', CoWinPublicApisNode);
    function CoWinPublicApisServiceNode(n) {
        RED.nodes.createNode(this, n);

        this.secureApiKeyValue = n.secureApiKeyValue;
        this.secureApiKeyHeaderOrQueryName = n.secureApiKeyHeaderOrQueryName;
        this.secureApiKeyIsQuery = n.secureApiKeyIsQuery;
    }

    RED.nodes.registerType('co-win-public-apis-service', CoWinPublicApisServiceNode, {
        credentials: {
            secureApiKeyValue: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
