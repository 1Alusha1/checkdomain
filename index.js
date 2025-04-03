const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const sendTelegramNotification = async (status, domain) => {
  const token = process.env.BOT_TOKEN; // Твой токен Telegram бота
  const chatId = "-4740863276"; // Чат, куда отправлять сообщения

  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: `Domain ${domain} status: ${status} at ${new Date().toLocaleString()}`,
  });
};

function extractDomain(url) {
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

exports.checkDomain = async (req, res) => {
  try {
    const domains = [];

    domains.forEach(async (domain) => {
      await axios.get(domain);
      await sendTelegramNotification("up", extractDomain(domain));
    });
  } catch (error) {
    await sendTelegramNotification("down");
  }
  res.send("Status checked");
};
