# ICICI Easypay Server

Service to manage easypay payment gateway in NodeJS

## Getting Started
```
npm install
npm run start
```

## Modes
By default debug mode is on. To turn it off set ```encironment=prod``` in environment

Debug mode will return debug params in response and print the same in server logs

#### Sample Request
```
curl --location 'http://localhost:3231/payment/generatelink' \
--header 'Content-Type: application/json' \
--data '{
    "endpoint": "https://eazypayuat.icicibank.com/EazyPG",
    "returnUrl": "return url",
    "paymode": "9",
    "secret": "Key",
    "merchantId": "id",
    "mandatoryFields": {
        "referenceNo": "456789",
        "submerchantId": "45",
        "transactionAmount": "10",
        "invoiceId": "",
        "invoiceDate": "",
        "invoiceTime": "",
        "merchantId": "",
        "payerType": "",
        "payerId": "",
        "transactionId":"",
        "transactionDate": "",
        "transactionTime": "",
        "transactionStatus": "",
        "refundId": "",
        "refundDate": "",
        "refundTime": "",
        "refundStatus": ""
    },
    "optionalFields": ""
}'


```
#### Sample Response with Debug mode enabled
Code 200
```
{
    "redirectUrl": "https://eazypayuat.icicibank.com/EazyPG?merchantid=id&mandatory fields=GD6qPybO6CTqf8OqcpJirz6UwGQtKH9Hs6LE8HHq4QQQhQyzML7+OczdbKvFFCwP&optional fields=DfRolnrNM01y6GU9ViXXOg==&returnurl=YPqx8aX9fg2pXPVMSlECMA==&Reference No=R3VSvzGOieNSnztjb+rnaQ==&submerchantid=atnZN6M1s1HndtJxnaaN7g==&transaction amount=TyndAlLVBDO0z1GlMt0d4w==&paymode=cejzc223qVtvZvj+hQcypw==",
    "referenceNo": "456789",
    "debug": {
        "receivedPayload": "{\"endpoint\":\"https://eazypayuat.icicibank.com/EazyPG\",\"returnUrl\":\"return url\",\"paymode\":\"9\",\"secret\":\"1111111111111111\",\"merchantId\":\"id\",\"mandatoryFields\":{\"referenceNo\":\"456789\",\"submerchantId\":\"45\",\"transactionAmount\":\"10\",\"invoiceId\":\"\",\"invoiceDate\":\"\",\"invoiceTime\":\"\",\"merchantId\":\"\",\"payerType\":\"\",\"payerId\":\"\",\"transactionId\":\"\",\"transactionDate\":\"\",\"transactionTime\":\"\",\"transactionStatus\":\"\",\"refundId\":\"\",\"refundDate\":\"\",\"refundTime\":\"\",\"refundStatus\":\"\"},\"optionalFields\":\"\"}",
        "pipedMandatoryParams": "456789|45|10|x|x|x|x|x|x|x|x|x|x|x|x|x|x",
        "plainQueryString": "{\"mandatory fields\":\"456789|45|10|x|x|x|x|x|x|x|x|x|x|x|x|x|x\",\"optional fields\":\" \",\"returnurl\":\"return url\",\"Reference No\":\"456789\",\"submerchantid\":\"45\",\"transaction amount\":\"10\",\"paymode\":\"9\"}",
        "encryptedQueryString": "{\"merchantid\":\"id\",\"mandatory fields\":\"GD6qPybO6CTqf8OqcpJirz6UwGQtKH9Hs6LE8HHq4QQQhQyzML7+OczdbKvFFCwP\",\"optional fields\":\"DfRolnrNM01y6GU9ViXXOg==\",\"returnurl\":\"YPqx8aX9fg2pXPVMSlECMA==\",\"Reference No\":\"R3VSvzGOieNSnztjb+rnaQ==\",\"submerchantid\":\"atnZN6M1s1HndtJxnaaN7g==\",\"transaction amount\":\"TyndAlLVBDO0z1GlMt0d4w==\",\"paymode\":\"cejzc223qVtvZvj+hQcypw==\"}"
    }
}

```

#### Sample Response with debug mode disabled
Code 200
```
{
    "redirectUrl": "https://eazypayuat.icicibank.com/EazyPG?merchantid=id&mandatory fields=GD6qPybO6CTqf8OqcpJirz6UwGQtKH9Hs6LE8HHq4QQQhQyzML7+OczdbKvFFCwP&optional fields=DfRolnrNM01y6GU9ViXXOg==&returnurl=YPqx8aX9fg2pXPVMSlECMA==&Reference No=R3VSvzGOieNSnztjb+rnaQ==&submerchantid=atnZN6M1s1HndtJxnaaN7g==&transaction amount=TyndAlLVBDO0z1GlMt0d4w==&paymode=cejzc223qVtvZvj+hQcypw==",
    "referenceNo": "456789",
    "debug": {}
}
```
### Error Response
Code : 500
```
{
    "message": "Some Error Occured"
}
```


### Customozation

To change port set PORT envionment variable. Default is 3231


### Point to Note

 - AES key should be 16 characters ling
 - Blank values are changes to space during encryption of mandatory fields
 - To Autogenerate referenceNo, send it as blank in mandatory params. it will autogenerate aa uuid as reference number
