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

import { embed } from "../tools";
import { axo } from "../axologs";
import * as evie from "../tools";
import { ContextMenuInteraction, GuildMember, Role } from "discord.js";
module.exports = {
  data: {
    name: "Accept Player",
    type: 2,
  },
  async execute(i: ContextMenuInteraction) {
    if (!i.inGuild()) {
      return;
    }

    const mem: GuildMember = i.member! as GuildMember;
    if (!mem.roles.cache.has("925183963331457076")) {
      return i.reply({
        content: "You are not a staff member!",
        ephemeral: true,
      });
    }
    const m = i.options.getMember("user") as GuildMember;
    if (m.roles.cache.has("904148775801585676")) {
      await m?.roles.remove("904148775801585676", `Re-accept by ${i.user}`);
    }
    const r: Role = i.guild!.roles.cache.find(
      (r) => r.id == "878074525223378974"
    ) as Role;
    const e = await evie.embed(i.guild!);
    const ji =
      "https://discord.com/channels/819106797028769844/819446614568599582/884646964074020905";
    e.setTitle("Accepted!");
    e.setDescription(
      `Good News! ${m} You were accepted by ${i.user}, you can read the join info [here](${ji}) if you don't know the server info yet.
       Anyways you must go onto the **Minecraft server** and type \`/discord link\` and dm the code to <@864676306662195200> so I can link your Minecraft Account with your Discord here`
    );
    e.addField(
      "Known Issue(s)",
      `* Running \`/discord link\` on Lunar Client makes you get the invite for the official Lunar Client Discord,
       just run the command on vanilla and come back if Lunar is your preferred way to play.`
    );
    e.addField(
      "Proximity Voice Chat",
      "To use Proximity Voice Chat in Game you don't need to do anything as it's all done in the Discord automatically by our bots, simply [read our blog post](https://www.tristansmp.com/blog/proximity) for more info :)"
    );
    e.addField(
      "Explore the Market",
      "On tsmp, there is an online market. This is where you can buy and sell items for Diamonds. For more info visit the [info page](https://tristansmp.com/info/markets)"
    );

    await m?.roles
      .add(r, `Accepted by ${i.user}`)
      .then(() => {
        i.reply({ embeds: [e], content: `${m} Good News!` });
      })
      .catch(() => {
        i.reply({ content: "Failed! Tell Tristan asap", ephemeral: true });
      });
  },
};
