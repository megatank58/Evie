"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const { axo } = require("../axologs");
        axo.startupMsg("Starting the Radio Systems");
        let options = {
            leaveOnEmpty: false,
        };
        try {
            await client.distube.playVoiceChannel(client.channels.cache.get("901631152278888508"), "https://www.youtube.com/watch?v=F2lk4jRl2xA", options);
            await client.distube.playVoiceChannel(client.channels.cache.get("901631152278888508"), "https://www.youtube.com/playlist?list=PL4pro5D7LdbirRYxvctFXEuk8tTz8fdut", options);
            let newQueue = client.distube.getQueue("901631152278888508");
            newQueue.shuffle();
            await newQueue.setRepeatMode(2);
        }
        catch (error) {
            console.log(error);
        }
        client.distube.on(`playSong`, async (queue, track) => {
            try {
                client.guilds.cache
                    .get(queue.id)
                    .me.voice.setDeaf(true)
                    .catch((e) => {
                    //console.log(e.stack ? String(e.stack).grey : String(e).grey)
                });
            }
            catch (error) {
                console.log(error);
            }
            try {
                var newQueue = client.distube.getQueue(queue.id);
                var newTrack = track;
                // Change Status and Console it
                client.user.setActivity(`${track.name} by ${track.uploader.name
                    .toString()
                    .replace(" - Topic", "")}`, { type: "LISTENING" });
                console.log(`${track.name} by ${track.uploader.name
                    .toString()
                    .replace(" - Topic", "")}`);
                // Change Channel Name
                //   client.channels.cache.get('897433283921580062').edit({ name: `🎵︱${track.name} by ${track.uploader.name.toString().replace(" - Topic", "")}` })
                //   .then(console.log)
                //   .catch(console.error);
            }
            catch (error) {
                console.log(error);
            }
        });
    },
};