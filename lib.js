/*jshint -W069 */
/**
 * Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 * @class CoWinPublicApis
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var CoWinPublicApis = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function CoWinPublicApis(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://cdn-api.co-vin.in/api';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
                this.apiKey = (typeof options === 'object') ? (options.apiKey ? options.apiKey : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name CoWinPublicApis#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    CoWinPublicApis.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };

            /**
            * Set Api Key
            * @method
            * @name CoWinPublicApis#setApiKey
            * @param {string} value - apiKey's value
            * @param {string} headerOrQueryName - the header or query name to send the apiKey at
            * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
            */
            CoWinPublicApis.prototype.setApiKey = function (value, headerOrQueryName, isQuery) {
                this.apiKey.value = value;
                this.apiKey.headerOrQueryName = headerOrQueryName;
                this.apiKey.isQuery = isQuery;
            };
        /**
        * Set Auth headers
        * @method
        * @name CoWinPublicApis#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        CoWinPublicApis.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
                headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
            }
            return headers;
        };

/**
 * Initiate beneficiary authentication using mobile and OTP
 * @method
 * @name CoWinPublicApis#generateOTP
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.generateOTP = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/auth/public/generateOTP';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to confirm the OTP for authentication.
 * @method
 * @name CoWinPublicApis#confirmOTP
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.confirmOTP = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/auth/public/confirmOTP';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get all the states in India.
 * @method
 * @name CoWinPublicApis#states
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
 */
 CoWinPublicApis.prototype.states = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/admin/location/states';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get all the districts.
 * @method
 * @name CoWinPublicApis#districts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
     * @param {string} parameters.stateId - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.districts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/admin/location/districts/{state_id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 
        
            path = path.replace('{state_id}', parameters['stateId']);
        
        


        if(parameters['stateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: stateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get planned vaccination sessions on a specific date in a given pin.
 * @method
 * @name CoWinPublicApis#findByPin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
     * @param {string} parameters.pincode - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
     * @param {string} parameters.date - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.findByPin = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/appointment/sessions/public/findByPin';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 

                if(parameters['pincode'] !== undefined){
                    queryParameters['pincode'] = parameters['pincode'];
                }
        
        
        


        if(parameters['pincode'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pincode'));
            return deferred.promise;
        }
 

                if(parameters['date'] !== undefined){
                    queryParameters['date'] = parameters['date'];
                }
        
        
        


        if(parameters['date'] === undefined){
            deferred.reject(new Error('Missing required  parameter: date'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get planned vaccination sessions on a specific date in a given district.
 * @method
 * @name CoWinPublicApis#findByDistrict
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
     * @param {string} parameters.districtId - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
     * @param {string} parameters.date - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.findByDistrict = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/appointment/sessions/public/findByDistrict';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 

                if(parameters['districtId'] !== undefined){
                    queryParameters['district_id'] = parameters['districtId'];
                }
        
        
        


        if(parameters['districtId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: districtId'));
            return deferred.promise;
        }
 

                if(parameters['date'] !== undefined){
                    queryParameters['date'] = parameters['date'];
                }
        
        
        


        if(parameters['date'] === undefined){
            deferred.reject(new Error('Missing required  parameter: date'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get vaccination centers by latitude and longitude. **Please note that this is a draft specification.**
 * @method
 * @name CoWinPublicApis#findByLatLong
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
     * @param {number} parameters.lat - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
     * @param {number} parameters.long - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.findByLatLong = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/appointment/centers/public/findByLatLong';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 

                if(parameters['lat'] !== undefined){
                    queryParameters['lat'] = parameters['lat'];
                }
        
        
        


        if(parameters['lat'] === undefined){
            deferred.reject(new Error('Missing required  parameter: lat'));
            return deferred.promise;
        }
 

                if(parameters['long'] !== undefined){
                    queryParameters['long'] = parameters['long'];
                }
        
        
        


        if(parameters['long'] === undefined){
            deferred.reject(new Error('Missing required  parameter: long'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get planned vaccination sessions for 7 days from a specific date in a given pin.
 * @method
 * @name CoWinPublicApis#calendarByPin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
     * @param {string} parameters.pincode - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
     * @param {string} parameters.date - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.calendarByPin = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/appointment/sessions/public/calendarByPin';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 

                if(parameters['pincode'] !== undefined){
                    queryParameters['pincode'] = parameters['pincode'];
                }
        
        
        


        if(parameters['pincode'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pincode'));
            return deferred.promise;
        }
 

                if(parameters['date'] !== undefined){
                    queryParameters['date'] = parameters['date'];
                }
        
        
        


        if(parameters['date'] === undefined){
            deferred.reject(new Error('Missing required  parameter: date'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get planned vaccination sessions for 7 days from a specific date in a given district.
 * @method
 * @name CoWinPublicApis#calendarByDistrict
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
     * @param {string} parameters.districtId - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
     * @param {string} parameters.date - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.calendarByDistrict = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/appointment/sessions/public/calendarByDistrict';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 

                if(parameters['districtId'] !== undefined){
                    queryParameters['district_id'] = parameters['districtId'];
                }
        
        
        


        if(parameters['districtId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: districtId'));
            return deferred.promise;
        }
 

                if(parameters['date'] !== undefined){
                    queryParameters['date'] = parameters['date'];
                }
        
        
        


        if(parameters['date'] === undefined){
            deferred.reject(new Error('Missing required  parameter: date'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to get planned vaccination sessions for 7 days from a specific date for a given center. **Please note that this is a draft specification.**
 * @method
 * @name CoWinPublicApis#calendarByCenter
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.acceptLanguage - The locate code of the preferred language such as en_US. The text data will be returned in the preferred language along with default English text.
     * @param {string} parameters.centerId - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
     * @param {string} parameters.date - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.calendarByCenter = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/appointment/sessions/public/calendarByCenter';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

        
        
                if(parameters['acceptLanguage'] !== undefined){
                    headers['Accept-Language'] = parameters['acceptLanguage'];
                }
        


 

                if(parameters['centerId'] !== undefined){
                    queryParameters['center_id'] = parameters['centerId'];
                }
        
        
        


        if(parameters['centerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: centerId'));
            return deferred.promise;
        }
 

                if(parameters['date'] !== undefined){
                    queryParameters['date'] = parameters['date'];
                }
        
        
        


        if(parameters['date'] === undefined){
            deferred.reject(new Error('Missing required  parameter: date'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API to download vaccination certificate in PDF format by beneficiary reference id. This API requires a <i>Bearer</i> token acquired with user mobile OTP validation as defined in User Authentication APIs.
 * @method
 * @name CoWinPublicApis#download
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.beneficiaryReferenceId - Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]
 */
 CoWinPublicApis.prototype.download = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/registration/certificate/public/download';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['beneficiaryReferenceId'] !== undefined){
                    queryParameters['beneficiary_reference_id'] = parameters['beneficiaryReferenceId'];
                }
        
        
        


        if(parameters['beneficiaryReferenceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: beneficiaryReferenceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return CoWinPublicApis;
})();

exports.CoWinPublicApis = CoWinPublicApis;
