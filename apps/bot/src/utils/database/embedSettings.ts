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

import type { Guild, Snowflake } from "discord.js";
import { dbUtils } from ".";

/** Gets the embed color for the specified guild */
async function getEmbedColor(guild: Guild): Promise<string | null> {
  try {
    const result = await dbUtils.getGuildSettings(guild);
    return result?.color || null;
  } catch (error) {
    return null;
  }
}

export const MiscDB = {
  getEmbedColor,
};