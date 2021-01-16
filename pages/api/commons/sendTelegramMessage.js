import axios from "axios";

const telegramMessageEscapeCharList = [
  "_",
  "*",
  "[",
  "]",
  "(",
  ")",
  "~",
  "`",
  ">",
  "#",
  "+",
  "-",
  "=",
  "|",
  "{",
  "}",
  ".",
  "!",
];

function escape(targetString) {
  let temp = targetString;
  for (let i = 0; i < telegramMessageEscapeCharList.length; i++) {
    const curEscapeChar = telegramMessageEscapeCharList[i];
    temp = temp.replace(curEscapeChar, `\\${curEscapeChar}`);
  }
  return temp;
}

export async function sendTelegramMessage(title, description, value) {
  // formatted as MarkdownV2
  const formattedMessage = encodeURIComponent(
    `*[${escape(title)}]*
${escape(description)}: *${escape(value)}*`
  );

  const { statusText } = await axios.get(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${formattedMessage}&parse_mode=MarkdownV2`
  );

  return statusText;
}
