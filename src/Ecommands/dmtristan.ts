import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dmtristan")
    .setDescription("Adds a line of text to my memory core")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What should I send to him?")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply({ content: "Sent!", ephemeral: true });

    const fs = require("fs");
    const logger = fs.createWriteStream("dmtristan.txt", {
      flags: "a",
    });

    const msg = interaction.options.getString("message");
    // append string to your file
    interaction.client.users.cache
      .get("97470053615673344")
      .message(interaction.user.tag.toString() + " said: " + msg);
  },
};