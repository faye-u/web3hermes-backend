import * as functions from "firebase-functions";
// import * as PushAPI from "@pushprotocol/restapi";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


'use strict';

// We use the https library to confirm the SNS subscription
const https = require('https');

// the sns-validator package verifies the host an signature of SNS messages
const MessageValidator = require('sns-validator');
const validator = new MessageValidator();


/**
 * Cloud Function.
 *
 * @param {req} request The web request from SNS.
 * @param {res} The response returned from this function.
 */

export const pushUndefyned = functions.https.onRequest((req, res) => {
  //functions.logger.info("Hello logs!", {structuredData: true});
  functions.logger.info("data")
  functions.logger.info(req.body, {structuredData: true});
  functions.logger.info(req.header, {structuredData: true});
  functions.logger.info(req., {structuredData: true});

  //TODO: push to front end using flutter push notification and remove users from communities who have no more nfts in their 
  // wallet

  // we only respond to POST method HTTP requests
 if (req.method !== 'POST') {
  res.status(405).end('only post method accepted');
  return;
}

// all valid SNS requests should have this header
const snsHeader = req.get('x-amz-sns-message-type');
if (snsHeader === undefined) {
  res.status(403).end('invalid SNS message');
  return;
}

// use the sns-validator library to verify signature
// we first parse the Cloud Function body into a JavaScript object
validator.validate(JSON.parse(req.body), async function (err: any, message: {
    TopicArn: string | undefined; Type: string; SubscribeURL: string; MessageId: string; Message: string | ArrayBuffer | {
      valueOf(): ArrayBuffer | // https://firebase.google.com/docs/functions/typescript
        //
        SharedArrayBuffer;
    }; Subject: any;
  }) {
  if (err) {
    // the message did not validate
    res.status(403).end('invalid SNS message');
    return;
  }

  // here we handle either a request to confirm subscription, or a new
  // message
  switch (message.Type.toLowerCase()) {
    case 'subscriptionconfirmation':
      console.log('confirming subscription ' + message.SubscribeURL);
      // SNS subscriptions are confirmed by requesting the special URL sent
      // by the service as a confirmation
      https.get(message.SubscribeURL, (subRes: { statusCode: any; headers: any; on: (arg0: string, arg1: (d: any) => void) => void; }) => {
        console.log('statusCode:', subRes.statusCode);
        console.log('headers:', subRes.headers);

        subRes.on('data', (d) => {
          console.log(d);
          res.status(200).end('ok');
        });
      }).on('error', (e: any) => {
        console.error(e);
        res.status(500).end('confirmation failed');
      });
      break;
    case 'notification':
      // this is a regular SNS notice, we relay to Pub/Sub
      console.log(message.MessageId + ': ' + message.Message);

      // Send a message to the topic
      try {
        res.status(200).end('ok');
      } catch (error) {
        res.status(400).end('failed to publish message');
      }
      break;
    default:
      console.error('should not have gotten to default block');
      res.status(400).end('invalid SNS message');
  }
});
});


