
# 🛠️ Token Forge

**Token Forge** is an AI-powered ERC-20 token deployer platform designed to simplify and streamline the process of creating and deploying tokens. Built for both native and non-native users, Token Forge promotes DeFi adoption and makes token deployment accessible to everyone.

It is hosted as a **Telegram Mini App**, making it easy to use, manage, and access widely through the Telegram ecosystem.

---

## 🚀 Built With

- **Nebula AI** - AI integration
- **Thirdweb** - Web3 SDK for contract deployment and management
- **Next.js** - Frontend framework
- **Telegraf.js** - Telegram bot framework

---

## 📦 Project Structure

- `tokenapp/` — Frontend (Next.js application)
- `bot/` — Telegram Bot (Telegraf.js)

---

## 🛠️ Getting Started

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd tokenapp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add the following environment variables:

   ```plaintext
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
   NEXT_PUBLIC_THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

🔗 **API Key Reference**:
Create your API keys at [Thirdweb Portal](https://portal.thirdweb.com/account/api-keys/create)

---

### Bot Setup

1. From the root directory, install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file and add the following environment variables:

   ```plaintext
   THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   PORT=your_port (e.g., 3000)
   ```

3. Start the bot:

   ```bash
   npm run dev
   ```

🔗 **Telegram Bot Token**:
Create your bot and get the token using [@BotFather](https://t.me/botfather)

---

## 🌟 Features

- AI-powered token generation
- ERC20 token deployment on Ethereum-compatible chains
- User-friendly Telegram Mini App
- Supports DeFi token creation best practices
- Seamless integration with Thirdweb for smart contract management

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

- [Thirdweb](https://thirdweb.com/)
- [Nebula AI](#)
- [Next.js](https://nextjs.org/)
- [Telegraf.js](https://telegraf.js.org/)

---

Would you also like me to help you create badges (like `Built with Next.js`, `Telegram Mini App`, etc.) for the top of the README to make it look even cooler? 🚀🎨
