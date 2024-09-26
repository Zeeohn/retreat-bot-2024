const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const env = require("dotenv").config();

// Load the JSON database
const usersData = JSON.parse(fs.readFileSync("nameDatabase.json"));

// Replace 'YOUR_BOT_TOKEN' with the token you got from BotFather
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Store user sessions in memory
const userSessions = {};

// Start command handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Check if user has already interacted before
  if (userSessions[userId] && userSessions[userId].registered) {
    bot.sendMessage(
      chatId,
      "You have already been verified. Use /get command to retrieve your code and documents."
    );
  } else {
    bot.sendMessage(
      chatId,
      "Glory to God in us! Please enter your full name according to how it was written in the invite you received i.e 'Temple Omolehin'"
    );
    userSessions[userId] = { step: "waiting_for_name" };
  }
});

// Get command handler
bot.onText(/\/get/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (userSessions[userId] && userSessions[userId].registered) {
    const userCode = userSessions[userId].code;

    if (!userCode) {
      const user = usersData.find(
        (u) => u.name.toLowerCase() === userMessage.toLowerCase()
      );

      if (user) {
        userSessions[userId] = { registered: true, code: user.code };
        bot
          .sendMessage(
            chatId,
            `Happy are you ${user.office} ${user.name} and welcome to Word Sanctuary Leadership Retreat 2024! \nYour identification code is: \n\n${user.code} \n\n Please present this code for check-in. \nThank you Sir.`
          )
          .then(() => {
            sendFile(chatId);

            // const queryOptions = {
            //   caption: "Leadership Retreat 2024 Docket",
            // };

            // const fileOptions = {
            //   filename: "Leadership Retreat 2024 Docket.pdf",
            //   contentType: "application/pdf",
            // };

            // // Send the PDF document
            // bot
            //   .sendDocument(
            //     chatId,
            //     fs.createReadStream("./document.pdf"),
            //     queryOptions,
            //     fileOptions
            //   )
            //   .catch((err) => console.error(`Failed to send document: `, err));
          });
      } else {
        bot.sendMessage(
          chatId,
          "Sorry, your name was not found in our database. Check if you entered it correctly, else you are not invited."
        );
      }
    } else {
      bot.sendMessage(chatId, `Your code is: \n\n${userCode}`).then(() => {
        sendFile(chatId);
      });
    }
  } else {
    bot.sendMessage(
      chatId,
      "You are not registered. Please start with /start command."
    );
  }
});

// Handle text messages for user input
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userMessage = msg.text.trim();

  if (
    userSessions[userId] &&
    userSessions[userId].step === "waiting_for_name"
  ) {
    // Check if the name exists in the JSON database
    const user = usersData.find(
      (u) => u.name.toLowerCase() === userMessage.toLowerCase()
    );

    if (user) {
      userSessions[userId] = { registered: true, code: user.code };

      bot
        .sendMessage(
          chatId,
          `Happy are you ${user.office} ${user.name} and welcome to Word Sanctuary Leadership Retreat 2024! \nYour identification code is: \n\n${user.code} \n\nPlease present this code for check-in. \nThank you Sir.`
        )
        .then(() => {
          sendFile(chatId);
        });
    } else {
      bot.sendMessage(
        chatId,
        "Sorry, your name was not found in our database. Check if you entered it correctly, else you are not invited."
      );
    }
  }
});

function sendFile(chatId) {
  const queryOptions = {
    caption:
      "Leadership Retreat 2024 Docket, kindly download and view. \nHappy are you!",
  };

  const fileOptions = {
    filename: "Leadership Retreat 2024 Docket.pdf",
    contentType: "application/pdf",
  };

  bot
    .sendDocument(
      chatId,
      "BQACAgQAAxkBAAEt8pZm9V4YmwAB8KVrxY2YYXnEE8tSzi4AAmAUAAKchLBTMlloc4ITa602BA",
      queryOptions,
      fileOptions
    )
    .catch((err) => console.error(`Failed to send document: `, err));
}

console.log("Bot is running...");
