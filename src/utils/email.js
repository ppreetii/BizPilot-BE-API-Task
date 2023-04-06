const { CourierClient } = require("@trycourier/courier");

const config = require("../configs/config");

const courier = CourierClient({
  authorizationToken: config.courierApiKey,
});

let sendEmail = async (subject, body, email) => {
  try {

    await courier.send({
      message: {
        content: {
          title: subject,
          body: body,
        },
        to: {
          email
        },
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendEmail
}

