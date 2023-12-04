const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fetch = require("node-fetch");
require("dotenv/config");

const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const likeRouter = require('./routes/likeRouter');
const productRouter = require('./routes/productRouter');
const productStatusRouter = require('./routes/productStatusRouter');
const communityRouter = require('./routes/communityRouter');
const messageRouter = require('./routes/messageRouter');
const followRouter = require('./routes/followRouter');
const signInRouter = require('./routes/signInRouter');
const signOutRouter = require('./routes/signOutRouter');
const savedPostRouter = require('./routes/savedPostRouter');
const communityParticipantRouter = require('./routes/communityParticipantRouter');


// middleware
const corsOption = { 
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200 
}

app.use(cors(corsOption));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

// app routes
app.use('/api/users/', userRouter);
app.use('/api/posts/', postRouter);
app.use('/api/comments/', commentRouter);
app.use('/api/likes/', likeRouter);
app.use('/api/products/', productRouter);
app.use('/api/product_status/', productStatusRouter);
app.use('/api/communities/', communityRouter);
app.use('/api/groups/messages/', messageRouter);
app.use('/api/follows', followRouter);
app.use('/api/users/login/', signInRouter);
app.use('/api/users/logout', signOutRouter);
app.use('/api/save_post/', savedPostRouter);
app.use('/api/community_participant/', communityParticipantRouter);

app.use(express.static("client"));
  
// parse post params sent in body in json format
app.use(express.json());

// paypal integration

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";
/**
* Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
* @see https://developer.paypal.com/api/rest/authentication/
*/
const generateAccessToken = async () => {
    try {
      if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
      const auth = Buffer.from(
        PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
      ).toString("base64");
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  };


  const createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
    console.log(
      "shopping cart information passed from the frontend createOrder() callback:",
      cart,
    );
    
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    };
    
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    
    return handleResponse(response);
  };

/**
* Capture payment for the created order to complete the transaction.
* @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
*/
const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });
    
    return handleResponse(response);
  };

  async function handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }

  app.post("/api/orders", async (req, res) => {
    try {
      // use the cart information passed from the front-end to calculate the order amount detals
      const { product } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(product);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  });


  app.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  });

// serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./client/checkout.html"));
});

// serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./client/checkout.html"));
});

// serve index.html
// app.get("/", (req, res) => {
//     res.sendFile(path.resolve("./client/checkout.html"));
// });

// spin up the server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})

