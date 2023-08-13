const crypto = require("crypto");

//const { v4: uuidv4 } = require("uuid");   //ENABLE if using sample payload

/*
AES Encrytion function

*/
function encrypt(inputParam, key) {
  const keyBuffer = Buffer.from(key, "utf-8");
  const inputBuffer = Buffer.from(inputParam, "utf-8");

  const cipher = crypto.createCipheriv("aes-128-ecb", keyBuffer, null);
  let encryptedBuffer = cipher.update(inputBuffer, "utf-8");
  encryptedBuffer = Buffer.concat([encryptedBuffer, cipher.final()]);

  const encryptedBase64 = encryptedBuffer.toString("base64");
  return encryptedBase64;
}

/*
Main Function

Input is payload and second parameter is debug mode boolean

If debug mode is enabled
*/

const generatePayload = function (payload, debug) {
  /*
SAMPLE PAYLOAD


const samplePayload = {
  endpoint: "https://eazypayuat.icicibank.com/EazyPG",
  returnUrl: "https://applicant.upsmfac.org/payment-response?resp=success",
  paymode: "9",
  secret: "AES Key",
  merchantId : "Merchant Id",
  mandatoryFields: {
    referenceNo: uuidv4(),
    submerchantId: "45",
    transactionAmount: "10.00",
    invoiceId: uuidv4(),
    invoiceDate: "12-12-2022",
    invoiceTime: "12:12",
    merchantId: "Merchant Id",
    payerType: "Candidate",
    payerId: uuidv4(),
    transactionDate: "",
    transactionTime: "",
    transactionStatus: "",
    refundId: "",
    refundDate: "",
    refundTime: "",
    refundStatus: "",
  },
  optionalFields: "",
};

*/

  const debugParams = {};

  if (debug)
    console.warn(
      "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Debug Mode Enabled>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n\n"
    );
  let mandatoryFields = "";

  if (debug) {
    console.info("Received Payload- " + JSON.stringify(payload) + "\n");
    debugParams["receivedPayload"] = JSON.stringify(payload);
  }

  Object.keys(payload.mandatoryFields).map(function (item) {
    if (payload.mandatoryFields[item].length > 0)
      mandatoryFields = mandatoryFields + payload.mandatoryFields[item] + "|";
    else mandatoryFields = mandatoryFields + " |";
  });
  mandatoryFields = mandatoryFields.substring(0, mandatoryFields.length - 1);
  if (debug) {
    console.log("Pipe spaced String - " + mandatoryFields + "end\n");
    debugParams["pipedMandatoryParams"] = mandatoryFields;
  }

  const queryJson = {
    "mandatory fields": mandatoryFields,
    "optional fields": " ",
    returnurl: payload.returnUrl,
    "Reference No": payload.mandatoryFields.referenceNo,
    submerchantid: payload.mandatoryFields.submerchantId,
    "transaction amount": payload.mandatoryFields.transactionAmount,
    paymode: payload.paymode,
  };
  if (debug) {
    console.info("Prepared Query[Plain]- " + JSON.stringify(queryJson) + "\n");
    debugParams["plainQueryString"] = JSON.stringify(queryJson);
  }

  const encryptedValuesJSON = {
    merchantid: payload.merchantId,
  };
  Object.keys(queryJson).map(function (item) {
    encryptedValuesJSON[item] = encrypt(queryJson[item], payload.secret);
  });

  if (debug) {
    console.info(
      "Prepared Query[Encrypted]- " + JSON.stringify(encryptedValuesJSON) + "\n"
    );
    debugParams["encryptedQueryString"] = JSON.stringify(encryptedValuesJSON);
  }

  let finalQuery = payload.endpoint + "?";
  Object.keys(encryptedValuesJSON).map(function (item) {
    finalQuery = finalQuery + item + "=" + encryptedValuesJSON[item] + "&";
  });
  finalQuery = finalQuery.substring(0, finalQuery.length - 1);

  if (debug)
    console.info(
      "Final Query- " +
        finalQuery +
        "\n\n <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<END OF TRANSACTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n"
    );
  return {
    redirectUrl: finalQuery,
    referenceNo: payload.mandatoryFields.referenceNo,
    debug: debugParams,
  };
};

module.exports = { generatePayload, encrypt };
