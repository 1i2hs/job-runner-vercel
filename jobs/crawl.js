import { JSDOM } from "jsdom";
import axios from "axios";
import { sendTelegramMessage } from "../commons/sendTelegramMessage";

process.on("unhandledRejection", (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log("unhandledRejection", error.message);
  process.exit(1);
});

async function start(title, description = "Data Found", { address, selector }) {
  console.log(`- A target address is "${address}"`);
  console.log(`- A CSS selector is "${selector}"`);
  console.log(`- Start extracting data`);

  const { data } = await axios.get(address);
  const dom = new JSDOM(data);
  const value = dom.window.document.querySelector(selector).textContent;

  console.log(`- Found data: ${value}`);
  console.log(`- Done extracting data`);
  console.log(`- Sending notification using Telegram Bot`);

  const statusText = await sendTelegramMessage(title, description, value);

  if (statusText !== "OK") {
    console.log(`- Failed to send notification to the Telegram Bot`);
    process.exit(1);
  }
  return;
}

export { start };
