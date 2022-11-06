import * as functions from "firebase-functions";
// import * as PushAPI from "@pushprotocol/restapi";
import {createSocketConnection, EVENTS} from "@pushprotocol/socket";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const pushUndefyned = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  functions.logger.info(request.rawBody, {structuredData: false})
  response.send("Hello from Firebase!");
});
