node-red-contrib-co-win-public-apis
================

Node-RED node for co-win-public-apis

Co-WIN Public APIs allow any third-party application to access certain un-restricted information, that can be shared with its users. This is limited only to read access in Co-WIN. The extent of access will be limited and in case of any misuse impacting the performance of Co-WIN solution will result in blocking any such application and entities as per the policies of MoHFW and taking any other appropriate action in accordance with law. The appointment availability data is cached and may be up to 5 minutes old. Further, these APIs are subject to a rate limit of 100 API calls per 5 minutes per IP. Please consider these points while using the APIs in your application. For further questions, please visit our <a href="https://github.com/cowinapi/developer.cowin/issues" target="_blank">Open Tracker on GitHub</a>. Please refer to <a href="https://apisetu.gov.in/document-central/cowin/Cowin%20API%20Guidelines.html" target="_blank">CoWIN API Guidelines</a> for more details.<br>[<i>Updated on 23rd September 2021</i>]

## Install

To install the stable version use the `Menu - Manage palette - Install` 
option and search for node-red-contrib-co-win-public-apis, or run the following 
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-co-win-public-apis

## Usage

### Methods

#### POST /v2/auth/public/generateOTP

Initiate beneficiary authentication using mobile and OTP

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /v2/auth/public/confirmOTP

API to confirm the OTP for authentication.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /v2/admin/location/states

API to get all the states in India.

    Accept-Language : string
     
    Accept : 'application/json'

#### GET /v2/admin/location/districts/{state_id}

API to get all the districts.

    Accept-Language : string
    state_id : string
     
    Accept : 'application/json'

#### GET /v2/appointment/sessions/public/findByPin

API to get planned vaccination sessions on a specific date in a given pin.

    Accept-Language : string
    pincode : string
    date : string
     
    Accept : 'application/json'

#### GET /v2/appointment/sessions/public/findByDistrict

API to get planned vaccination sessions on a specific date in a given district.

    Accept-Language : string
    district_id : string
    date : string
     
    Accept : 'application/json'

#### GET /v2/appointment/centers/public/findByLatLong

API to get vaccination centers by latitude and longitude. **Please note that this is a draft specification.**

    Accept-Language : string
    lat : number
    long : number
     
    Accept : 'application/json'

#### GET /v2/appointment/sessions/public/calendarByPin

API to get planned vaccination sessions for 7 days from a specific date in a given pin.

    Accept-Language : string
    pincode : string
    date : string
     
    Accept : 'application/json'

#### GET /v2/appointment/sessions/public/calendarByDistrict

API to get planned vaccination sessions for 7 days from a specific date in a given district.

    Accept-Language : string
    district_id : string
    date : string
     
    Accept : 'application/json'

#### GET /v2/appointment/sessions/public/calendarByCenter

API to get planned vaccination sessions for 7 days from a specific date for a given center. **Please note that this is a draft specification.**

    Accept-Language : string
    center_id : string
    date : string
     
    Accept : 'application/json'

#### GET /v2/registration/certificate/public/download

API to download vaccination certificate in PDF format by beneficiary reference id. This API requires a <i>Bearer</i> token acquired with user mobile OTP validation as defined in User Authentication APIs.

    beneficiary_reference_id : string
     
    Accept : 'application/json'


## License

#### Apache-2.0

