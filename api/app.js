import fs from "fs";
import fetch from "node-fetch";

// Load the JSON database
const usersData = JSON.parse(fs.readFileSync("../nameDatabase.json"));

// Telegram token and API URL
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`;

// Store user sessions in memory
const userSessions = {};

// Vercel serverless function handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const userId = update.message.from.id;
      const text = update.message.text.trim();

      if (text === "/start") {
        return await handleStartCommand(chatId, userId, res);
      } else if (text === "/get") {
        return await handleGetCommand(chatId, userId, res);
      } else {
        return await handleUserMessage(chatId, userId, text, res);
      }
    }
  }

  res.status(200).send("OK");
}

// Start command handler
async function handleStartCommand(chatId, userId, res) {
  if (userSessions[userId] && userSessions[userId].registered) {
    return sendMessage(
      chatId,
      "You have already been verified. Use /get command to retrieve your code and documents.",
      res
    );
  } else {
    userSessions[userId] = { step: "waiting_for_name" };
    return sendMessage(
      chatId,
      "Glory to God in us! Please enter your full name according to how it was written in the invite you received i.e 'Temple Omolehin'",
      res
    );
  }
}

// Get command handler
async function handleGetCommand(chatId, userId, res) {
  if (userSessions[userId] && userSessions[userId].registered) {
    const userCode = userSessions[userId].code;
    return sendMessage(chatId, `Your code is: \n\n${userCode}`).then(() =>
      sendFile(chatId, res)
    );
  } else {
    return sendMessage(
      chatId,
      "You are not registered. Please start with /start command.",
      res
    );
  }
}

// Handle user messages
async function handleUserMessage(chatId, userId, userMessage, res) {
  if (
    userSessions[userId] &&
    userSessions[userId].step === "waiting_for_name"
  ) {
    const user = usersData.find(
      (u) => u.name.toLowerCase() === userMessage.toLowerCase()
    );

    if (user) {
      userSessions[userId] = { registered: true, code: user.code };
      return sendMessage(
        chatId,
        `Happy are you ${user.office} ${user.name} and welcome to Word Sanctuary Leadership Retreat 2024! \nYour identification code is: \n\n${user.code} \n\nPlease present this code for check-in. \nThank you Sir.`,
        res
      ).then(() => sendFile(chatId, res));
    } else {
      return sendMessage(
        chatId,
        "Sorry, your name was not found in our database. Check if you entered it correctly, else you are not invited.",
        res
      );
    }
  }

  res.status(200).send("OK");
}

// Send message to user
async function sendMessage(chatId, text, res) {
  const url = `${BASE_URL}sendMessage`;
  const body = {
    chat_id: chatId,
    text: text,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(`Error sending message: ${response.statusText}`);
    res.status(500).send("Error sending message.");
  } else {
    res.status(200).send("Message sent.");
  }
}

// Send file to user
async function sendFile(chatId, res) {
  const url = `${BASE_URL}sendDocument`;
  const body = {
    chat_id: chatId,
    document:
      "BQACAgQAAxkBAAEt8pZm9V4YmwAB8KVrxY2YYXnEE8tSzi4AAmAUAAKchLBTMlloc4ITa602BA",
    caption:
      "Leadership Retreat 2024 Docket, kindly download and view. \nHappy are you!",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(`Error sending file: ${response.statusText}`);
    res.status(500).send("Error sending file.");
  } else {
    res.status(200).send("File sent.");
  }
}
