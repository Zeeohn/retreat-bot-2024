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
        bot.sendMessage(
          chatId,
          `Welcome to Word Sanctuary Leadership Retreat 2024 ${user.name}! Your identification code is: ${user.code} . Please present this code for check-in. Thank you Sir.`
        );

        // Send the PDF documents
        sendDocuments(chatId);
      } else {
        bot.sendMessage(
          chatId,
          "Sorry, your name was not found in our database. Check if you entered it correctly, else you are not invited."
        );
      }
    } else {
      bot.sendMessage(chatId, `Your code is: ${userCode}`);
      // Send the PDF documents
      sendDocuments(chatId);
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
      bot.sendMessage(
        chatId,
        `Welcome to Word Sanctuary Retreat 2024 ${user.name}! Your identification code is: ${user.code} . Please present this code for check-in. Thank you Sir.`
      );

      // Send the PDF documents
      sendDocuments(chatId);
    } else {
      bot.sendMessage(
        chatId,
        "Sorry, your name was not found in our database. Check if you entered it correctly, else you are not invited."
      );
    }
  }
});

// Function to send PDF documents
function sendDocuments(chatId) {
  const documents = ["/GLOBAL_INVITE.pdf"]; // Replace with actual paths to your documents

  documents.forEach((doc) => {
    bot
      .sendDocument(chatId, doc)
      .catch((err) => console.error(`Failed to send document ${doc}:`, err));
  });
}

console.log("Bot is running...");
