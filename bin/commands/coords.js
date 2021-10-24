"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName("coords")
        .setDescription("Spits a random set of coords on tristansmp.com"),
    async execute(interaction) {
        await interaction.reply("<a:loading:877782934696919040> Fetching Info");
        const idk_msg = [
            "a Stronghold at `1464 ~ 584` ",
            "an Igloo at `5904 ~ -4816`",
            "a Jungle Pyramid at `2864 ~ -336`",
            "a Mansion at `17488 ~ 1568`",
            "a Mineshaft at `864 ~ 224`",
            "a Monument at `2256 ~ -1456`",
            "a Pillager Outpost at `-320 ~ 1360`",
            "a Shipwreck at `400 ~ 192`",
            "Soap's Mob Farm at `1784 ~ 1141`",
            "Soap's Village & Farm at `2269 ~ 1633`",
            "Ice's Castle at `760 70 7263`",
            "John's Cruncated Octahedron at `710 146 -6953`",
            "Ice Spike Monument at `-58863 73 -7940`",
            // ``
        ];
        const exampleEmbed = new discord_js_1.MessageEmbed().setColor("#0099ff").setTimestamp();
        const index = Math.floor(Math.random() * (idk_msg.length - 1) + 1);
        interaction.editReply("Fetched <:applesparkle:841615919428141066>");
        exampleEmbed.addField("Here's a random landmark in the overworld on `tristansmp.com`", "theres " + idk_msg[index]);
        exampleEmbed.addField("Hey, " +
            interaction.user.username.toString() +
            " want your landmark added to this command?", "If so directly contact Tristan with the command `/dmtristan <message>` in <#877795126615879750>");
        await interaction.editReply({ embeds: [exampleEmbed] });
    },
};