const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(token);
const THIRDWEB_SECRET_KEY = process.env.THIRDWEB_SECRET_KEY;

const API_URL = "https://nebula-api.thirdweb.com";

const createSession = async (title = "Smart Contract Explorer") => {
  const response = await fetch(`${API_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-secret-key": THIRDWEB_SECRET_KEY,
    },
    body: JSON.stringify({ title }),
  });

  const data = await response.json();
  return data;
};

const sendMessage = async (sessionId, chainId, contractAddress) => {
  const message = `Give me all the details of this contract ${contractAddress} on chain ${chainId}`;
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "x-secret-key": THIRDWEB_SECRET_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      stream: false,
      session_id: sessionId,
    }),
  });

  return await response.json();
};

const userStates = {};

// Start command
bot.start(async (ctx) => {
  const chatId = ctx.chat.id;

  userStates[chatId] = {
    waitingForChain: true,
    waitingForContract: false,
    conversationActive: false,
    chainId: null,
    contractAddress: null,
  };

  await ctx.reply(
    "Welcome! This bot will help you explore a smart contract.\n\nSelect a chain to continue:",
    Markup.inlineKeyboard([
      [Markup.button.callback("Ethereum Mainnet", "chain_1")],
      [Markup.button.callback("Polygon", "chain_137")],
      [Markup.button.callback("Sepolia", "chain_11155111")],
      [Markup.button.callback("Base", "chain_8453")],
      [Markup.button.callback("Expanse", "chain_2")],
      [Markup.button.callback("Core Testnet", "chain_1115")],
      [Markup.button.callback("RootStock Testnet", "chain_31")],
    ])
  );
});

// Chain selection handler
bot.action(/chain_(\d+)/, async (ctx) => {
  const chatId = ctx.chat.id;
  const chainId = ctx.match[1];

  if (!userStates[chatId]) {
    ctx.reply("Please start by sending /start");
    return;
  }

  userStates[chatId].chainId = chainId;
  userStates[chatId].waitingForChain = false;
  userStates[chatId].waitingForContract = true;

  await ctx.reply(
    `Chain selected: ${chainId}. Now enter the contract address:`
  );
});

// Handle text input (contract address)
bot.on("text", async (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text.trim();
  if (text.startsWith("/")) return;

  const state = userStates[chatId];
  if (!state) {
    ctx.reply("Please start by sending /start");
    return;
  }

  if (state.waitingForContract) {
    state.contractAddress = text;
    state.waitingForContract = false;

    ctx.reply("Creating session and fetching data...");

    try {
      const session = await createSession();
      const sessionId = session.result.context.session_id;
      const chainId = state.chainId;

      const response = await sendMessage(
        sessionId,
        chainId,
        state.contractAddress
      );

      console.log("Response from Nebula:", response);

      state.conversationActive = true;

      const responseText = response.message;

      ctx.reply(responseText, { parse_mode: "Markdown" });
    } catch (error) {
      console.error("Error:", error);
      ctx.reply("Error fetching data from Nebula. Please try again later.");
    }
  }
});

// Catch all errors
bot.catch((err) => {
  console.error("Bot error:", err);
});

// Start the bot
bot.launch().then(() => {
  console.log("🤖 Bot is running...");
});

app.listen(3000, () => {
  console.log(`Server listening on port no ${port}`);
});
