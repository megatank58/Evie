"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const minecraft_server_util_1 = __importDefault(require("minecraft-server-util"));
const discord_js_1 = require("discord.js");
const imgur_1 = __importDefault(require("imgur"));
const axologs_1 = require("../axologs");
const embed_json_1 = __importDefault(require("../botconfig/embed.json"));
var serverIconLink = null;
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName("serverstats")
        .setDescription("Replies with Minecraft Server Stats!")
        .addStringOption((option) => option
        .setName("input")
        .setDescription("Minecraft Java Server Address (If empty it will pull up TristanSMP Info")
        .setRequired(false)),
    async execute(interaction) {
        let realInput = "tristansmp.com";
        if (!interaction.options.getString("input") == undefined) {
            realInput = interaction.options.getString("input");
        }
        minecraft_server_util_1.default
            .status(realInput) // port is default 25565
            .then((response) => {
            interaction.deferReply();
            let data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAAAAACIM/FCAAAChElEQVR4Ae3aMW/TQBxAcb70k91AAiGuGlZAtOlQApWaDiSdklZq2RPUTm1xUWL3PgqSpygkXlh88N54nn7S2Trd3y/CP5IQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECPmPIEKECBEiRIgQIeX82+FBO0naB4eTRRkt5P7sNWt1Rw9RQvKThI2SYR4f5OoVW2rfRAYpT6hqHc8WeVHki9mgRdWwiAmyfA9AdrlaW5tlAHxcxQMpK8feRbGxPEkrSREN5ARg/y780V0GMIwFcgXwLg9byvsAN3FA8lfAfr7jYQZ0nqKAfAb21vYVwNruSoEvMUDuE+Ai7IKECZA+RAA5A7JiN6TMgFHzIeUb4DLshoQZ0H1uPGQOvFzVQZYtYNF4yBg4DnWQMAAmjYccArN6yBQ4ajzkAFjUQ+ZAv/GQNpDXQ3Kg03hIAhT1kAJIhLi1/vJl39Ic6Mf3+a2K8PM7BgahtgEwjuKI0lqGjSI8opRdYFb3sk/jODSGEZCVuyFFDzgPzYc8JMBkN2QMpI8RQMIQ2LvdBblNgdM4Lh/aQJaHrf3sAe2nKCDhGqCfb3VEcx1UNQTItlzQ3fYAvoZYIMUHgHRSbiyPU4BPZUSX2JWEbLZcW5v2qByrmMYKxZCq1mA6z4sin08HLapOy8gGPddtttT5HuHobZiwUXr6K85h6KjLWm/PH+MdTy/GR/12knb6g8mPZ38YECJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAh0fUb5q7oCGreEVEAAAAASUVORK5CYII=";
            data == response.favicon; // your image data
            var base64Data = data.replace(/^data:image\/png;base64,/, "");
            imgur_1.default
                .uploadBase64(base64Data)
                .then((json) => {
                axologs_1.axo.log("[SERVER STATS CACHE] " + json.link);
                const serverIconLink = json.link;
                const exampleEmbed = new discord_js_1.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Server Stats")
                    .setDescription("**Server Address**: " + "`" + realInput + "`")
                    .addFields({
                    name: "Online Players",
                    value: response.onlinePlayers.toString() +
                        "/" +
                        response.maxPlayers.toString(),
                }, {
                    name: "Motd",
                    value: "```" +
                        response.description.descriptionText.toString() +
                        "```",
                }, {
                    name: "Server Version",
                    value: "```" + response.version + "```",
                }, {
                    name: "Server Icon",
                    value: ":point_down:",
                })
                    .setImage(serverIconLink)
                    .setTimestamp()
                    .setFooter(embed_json_1.default.footertext, embed_json_1.default.footericon);
                interaction.editReply({
                    embeds: [exampleEmbed],
                });
            })
                .catch((error) => {
                axologs_1.axo.err(error.message);
            });
        })
            .catch((err) => {
            axologs_1.axo.err(err.message);
        });
    },
};
