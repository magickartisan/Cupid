// ✅ REPLACE THESE
//const CLIENT_ID = "1520221814368894996";
//const GUILD_ID = "827026853004312576";

require("dotenv").config();
console.log("TOKEN:", process.env.DISCORD_TOKEN);
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get information by code")
    .addIntegerOption(option =>
      option.setName("code")
        .setDescription("Enter the code")
        .setRequired(true)
    )
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// ✅ ONLY NEED CLIENT_ID for global commands
const CLIENT_ID = "1520221814368894996";

(async () => {
  try {
    console.log("🚀 Registering GLOBAL slash commands...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered globally!");
  } catch (error) {
    console.error("❌ ERROR:");
    console.error(error);
  }
})();