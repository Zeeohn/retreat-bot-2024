import fs from "fs";
import fetch from "node-fetch";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "api", "nameDatabase.json");
const usersData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

// // Load the JSON database
// const usersData = JSON.parse(fs.readFileSync("./nameDatabase.json"));

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

      let messageResult;
      let fileResult;

      if (text === "/start") {
        messageResult = await handleStartCommand(chatId, userId);
      } else if (text === "/get") {
        messageResult = await handleGetCommand(chatId, userId);
      } else {
        messageResult = await handleUserMessage(chatId, userId, text);
      }

      // Send the response based on the result of the message and file sending
      if (messageResult?.status === "success") {
        res.status(200).send("Action completed successfully.");
      } else {
        res.status(500).send("An error occurred.");
      }
    }
  } else {
    res.status(200).send("OK");
  }
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
async function handleGetCommand(chatId, userId) {
  if (userSessions[userId] && userSessions[userId].registered) {
    const userCode = userSessions[userId].code;

    const messageResult = await sendMessage(
      chatId,
      `Your code is: \n\n${userCode}`
    );
    if (messageResult.status === "success") {
      const fileResult = await sendFile(chatId);
      return fileResult;
    }
    return messageResult;
  } else {
    return sendMessage(
      chatId,
      "You are not registered. Please start with /start command."
    );
  }
}

async function handleUserMessage(chatId, userId, userMessage) {
  if (
    userSessions[userId] &&
    userSessions[userId].step === "waiting_for_name"
  ) {
    const user = usersData.find(
      (u) => u.name.toLowerCase() === userMessage.toLowerCase()
    );

    if (user) {
      userSessions[userId] = { registered: true, code: user.code };
      const messageResult = await sendMessage(
        chatId,
        `Happy are you ${user.office} ${user.name} and welcome to Word Sanctuary Leadership Retreat 2024! \nYour identification code is: \n\n${user.code} \n\nPlease present this code for check-in. \nThank you Sir.`
      );
      if (messageResult.status === "success") {
        const fileResult = await sendFile(chatId);
        return fileResult;
      }
      return messageResult;
    } else {
      return sendMessage(
        chatId,
        "Sorry, your name was not found in our database. Check if you entered it correctly, else you are not invited."
      );
    }
  }

  return { status: "success", message: "OK" };
}

async function sendMessage(chatId, text) {
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
    return { status: "error", message: "Error sending message" };
  }
  return { status: "success", message: "Message sent" };
}

async function sendFile(chatId) {
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
    return { status: "error", message: "Error sending file" };
  }
  return { status: "success", message: "File sent" };
}
