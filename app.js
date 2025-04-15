const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const env = require("dotenv").config();
const express = require("express");
require("./convert");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("OK - Bot is running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

function keepAlive() {
  const url = "https://retreat-bot-2024.onrender.com/health";
  setInterval(() => {
    fetch(url)
      .then(() => console.log("Ping successful"))
      .catch((err) => console.error("Ping failed:", err));
  }, 13 * 60 * 1000); // Every 13 minutes (Render times out after 15 min of inactivity)
}

// Call this function when your app starts
keepAlive();

// Load the JSON database
const usersData = JSON.parse(fs.readFileSync("nameDatabase.json"));

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
      "Glory to God in us! Please enter your full name in the exact format it was written in the invite you received i.e 'Temple Omolehin'"
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
            `Happy are you ${user.office} ${user.name} from ${user.installation} and welcome to Word Sanctuary Leadership Retreat 2025! \nYour identification code is: \n\n${user.code} \n\n Please present this code for check-in. \nThank you and remain ever blessed!`
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
          `Happy are you <b>${user.office}</b> <b>${user.name}</b> from <b>${user.installation}</b> and welcome to Word Sanctuary Leadership Retreat 2025! 

Your identification code is: 

<code>${user.code}</code>

Please present this code for check-in. 
Thank you and remain ever blessed!`,
          {
            parse_mode: "HTML",
          }
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
      "Leadership Retreat 2025 Docket, kindly download and view. \nHappy are you!",
  };

  const fileOptions = {
    filename: "Leadership Retreat 2025 Docket.pdf",
    contentType: "application/pdf",
  };

  bot
    .sendDocument(
      chatId,
      fs.createReadStream("./2025_Document.pdf"),
      queryOptions,
      fileOptions
    )
    .then(() => {
      console.log("Document sent successfully.");
    })
    .catch((err) => console.error(`Failed to send document: `, err));
}

console.log("Bot is running...");
