const fetch = require("node-fetch");

module.exports = {
    usage: ["tik-img", "tt-img"],
    description: "Fetch and send images from a TikTok post",
    isPrivateOnly: false,
    isGroupOnly: false,
    isAdminOnly: false,
    emoji: "✨",

    execute: async (sock, m, args, kord) => {
        if (!args[0]) {
            return kord.reply("_Provide a TikTok URL._");
        }
        const apiUrl = `https://kord-api.vercel.app/tik-img?url=${encodeURIComponent(args[0])}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (!data.downloadableImages || data.downloadableImages.length === 0) {
                return kord.reply("_No images found._");         
            }
            for (const imgUrl of data.downloadableImages) {
                await kord.sendImage(imgUrl, "");
            }     
            await kord.reply("*_done!_*")
        } catch (error) {
            console.error("Error:", error);
            return kord.reply(`${error}`);
        }
    }
};