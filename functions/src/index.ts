import * as functions from "firebase-functions";
// import * as PushAPI from "@pushprotocol/restapi";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

/*
const ethers = require('ethers');
const PK = 'your_channel_address_secret_key';
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);


result = await PushAPI.channels.subscribe({
    signer: _signer,
    // channel address in CAIP
    channelAddress: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681',
    // user address in CAIP
    userAddress: 'eip155:5:0x52f856A160733A860ae7DC98DC71061bE33A28b3',
    onSuccess: () => {
     console.log('opt in success');
    },
    onError: () => {
      console.error('opt in error');
    },
    env: 'staging'
  })
*/
