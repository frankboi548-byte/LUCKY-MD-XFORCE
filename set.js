const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0hKbUswVEQrOFcxdnVidkcySHNJZWs2a1RkSkc4YjdETDN5eVViOE4xYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXQxejhBaUtpZE9yZ3ZaRmJ5bC9wa0RJOGdRbW1KUVNVQklSL1lTQU1DST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTnY4SHlkNVZEQjNPZ01ldGxLVEMyS1lTd2JxSCt6Zjk4L1Fob3dhYmtBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhdys5cGxBazRZekt3MS9teTFidXVMY095bENoTkN0L21KU0ttVXNmYTE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFKb2xtNEplMmdyVDNyNXhMUlErM0I4dlNLZjBCVFpaY2ZUNkkwWWZNV0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGK0FRUmpLOHZlb1NnaHdFWXdMck1RVkRydjNmV0tHR3J5bG12QTVyRXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK09GM21lMUVTdlFWNi9xMk51SEptUEc1VzkxQzJBbEs5aVBmUTZkK01HTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU1kVHhSQm5HWklsc2EvNmZQWEgwV3I3ekpZZVFaQk9rbHNVQVNmZEJrVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdWQ05QQWVTb3FIQU03MXd6Rll5VU9reUxJWVlEbXBmVVFJeFhKNUJLSzFQK1krNWhtMHFROFRacklXcFJHMTM0d1BuWDVYTUNncVVaSU5UZTk0eENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA3LCJhZHZTZWNyZXRLZXkiOiJmYy9WSFlvTEpkb0haMTFDTDFzN0l4NXdZbDVPQmhCdnNWNXhWdGF1Q0FrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NzgzNTgzMDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdDNTNDMzRFQUQzQkMwNTQyQ0VDMzJFMDAxNUJBRERFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ3MDAwODJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3NzgzNTgzMDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA3NUI5M0QxMTEzRjU3QUI1MjM5M0JBQkNGRTY3OUJDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ3MDAwODR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ik1FNURaWE5UIiwibWUiOnsiaWQiOiIyNzc4MzU4MzA2ODoyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdmYHwnZmPIEJvaSwqRnJhbmsgIPCdmYHwnZmPIOC8hiAg4LyGIPCTg6Ag8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCrIiwibGlkIjoiNTc5OTU1MzA2NDE1MDk6MkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lQUndLWUJFSjZ5MnNRR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJVSnlyUjMvL1k5OXVZRXp3RmRyK0k3b0ZScEg2S3RPS3F2Y1VONmozRjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjJ1bWMvNG1ZRmhVOW9PclNkcDBRbkZ5NnZ3c2g0eE9IWFdOMHlJV2x6anV6a1pFWXUrNWJGbHVTbURwTytZQmlZOVhHN1V5cFJSd1lYaTNObUtSU0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3ZG5mWThXUWRxVWw2anpDT2lueUVSVnZITjhIeENLS3lQenl5djQrckdiQStISFo1dmwvWmpaSGMrMklxSEdMM3R2akpEWjlNaDZCVk9BNklPWmdDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NzgzNTgzMDY4OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGxDY3EwZC8vMlBmYm1CTThCWGEvaU82QlVhUitpclRpcXIzRkRlbzl4ZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0NzAwMDc1LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZ4dSJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "𝙁𝙏 Boi,*Frank  𝙁𝙏 ༆  ༆ 𓃠",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27783583068",
    DEV : process.env.DEV || "𝙁𝙏 Boi,*Frank  𝙁𝙏 ༆  ༆ 𓃠Tz",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://fredi-ai-site.vercel.app",
    CAPTION : process.env.CAPTION || "𝙁𝙏 Boi,*Frank  𝙁𝙏 ༆  ༆ 𓃠-MD-XFORCE",
    BOT : process.env.BOT_NAME || '𝙁𝙏 Boi,*Frank  𝙁𝙏 ༆  ༆ 𓃠-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Capetown", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
