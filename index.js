console.log("🔥 Brean new deployment");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Client, GatewayIntentBits } = require("discord.js");

// ✅ Create client FIRST
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// ✅ READY EVENT
client.once("ready", (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

// ✅ Log errors
client.on("error", (err) => {
  console.error("❌ DISCORD ERROR:", err);
});

// ✅ Interaction test
client.on("interactionCreate", async (interaction) => {
  console.log("🔥 Interaction triggered");

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "info") {
    try {
      await interaction.deferReply();

      const code = interaction.options.getInteger("code");

      const infoDB = require("./codes.json");
      const item = infoDB[String(code)];

      if (!item) {
        await interaction.editReply("❌ Invalid code.");
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(item.title || "No title")
        .setDescription(item.description || "No description")
        .setColor(0x5865f2)
        .setFooter({ text: `Code: ${code}` });

      await interaction.editReply({
        embeds: [embed],
      });

    } catch (err) {
      console.error("❌ ERROR:", err);

      if (interaction.deferred) {
        await interaction.editReply("⚠️ Error occurred");
      }
    }
  }
});


// ✅ LOGIN
console.log("🚀 Starting Discord login...");

client.login(process.env.DISCORD_TOKEN).then(() => {
  console.log("✅ Login request sent");
}).catch((err) => {
  console.error("❌ LOGIN FAILED:", err);
});

// ✅ Express LAST
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});