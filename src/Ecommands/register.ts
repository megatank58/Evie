/* 
Copyright 2022 Tristan Camejo

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { SlashCommandBuilder } from "@discordjs/builders";
import { embed } from "../tools";

const regiSlash = require("../events/ready");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reslash")
    .setDescription("Add all new slash commands"),
  async execute(interaction) {
    const client = interaction.client;

    if (interaction.user.toString() == "<@97470053615673344>") {
      regiSlash;
      await interaction.reply({
        content: "Refreshing!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "Hey! Your not one of my Devs!",
        ephemeral: true,
      });
    }
  },
};
