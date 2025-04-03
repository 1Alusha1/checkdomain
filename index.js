const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const sendTelegramNotification = async (status) => {
  const token = process.env.BOT_TOKEN; // Твой токен Telegram бота
  const chatId = "-4740863276"; // Чат, куда отправлять сообщения

  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: `Domain status: ${status} at ${new Date().toLocaleString()}`,
  });
};

exports.checkDomain = async (req, res) => {
  try {
    await axios.get("domain");
    await sendTelegramNotification("up");
  } catch (error) {
    await sendTelegramNotification("down");
  }
  res.send("Status checked");
};
