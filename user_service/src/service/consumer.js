import amqp from "amqplib/callback_api.js";
import progressModel from "../model/userProgressModel.js";
import { RABBITMQURI } from "../../config.js";

// Function to consume messages from the queue
export async function consumeAuthQueue() {
  try {
    amqp.connect(RABBITMQURI, function (error0, connection) {
      if (error0) {
        console.error("Failed to connect to RabbitMQ:", error0);
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          console.error("Failed to create a channel:", error1);
          throw error1;
        }

        const queue = "scores_queue";

        channel.assertQueue(queue, {
          durable: false,
        });

        console.log(`User service  is waiting for messages in ${queue}.`);

        channel.consume(
          queue,
          async function (msg) {
            if (msg !== null) {
              console.log("Message received from authQ");
              const Data = JSON.parse(msg.content.toString());
              await progressModel.create({
                user_id: Data._id,
                score: Data.score,
              });
            } else {
              console.log("Received a null message");
            }
          },
          {
            noAck: true,
          }
        );
      });
    });
  } catch (error) {
    console.error("Error in consumeAuthQueue:", error);
  }
}
