import amqp from "amqplib/callback_api.js";
import { RABBITMQURI } from "../../config.js";

export const sendMessage = async function (queue, message) {
  amqp.connect(RABBITMQURI, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(message));
    });

    setTimeout(function () {
      connection.close();
    }, 500);
  });
};
