 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0RiQTQ1TFdYUUpLWWtUY1VSVjJHakFLc3U4dElOWTcwcjhhRVRvUnBFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0ZsS3N6M2dXYXNQM1RKUGowOTNnMWhMRXZLL2pTU0UwWEJ0b0RjRENWUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnT0NoV2VmZkpZUUFHSW43YUJyYXJWUCtFOXBUSWl6cnIwL3BOUmkrTDBjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwOWVYT2hjV21jamJmM0dxejIxN0RGamgydWh5aWFnK0Q2b2xubWVSWlVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndKQ0drbzM2K0tFN0NjbXFOSWxzRG5IMGdRcDYvc1FZdERva2VvTUc3bEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikl4VEFqdmJHZXVCZWNFdzI4QW81MGpIQktLSW13RTNXMjJROXJ5SXc4ams9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0VXSjR1aXVnQUJLQzVjMjdXSmUxRWZRd2dsZ01PL290VkJGUC8vVERHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWlQU0VNaG42a1M2WVRHbVpJVFlGYmtaeGpid1MxY2RMUXE2YmJSbWRGdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB5cnhXY1gxNExGdWxQUVJwOWQxV3h0alhUajVPVGZFSytxdmVtL2hkaHJVR3FaY25MYWZ1amsxZVVnV3loTWN4cGpDbXVIbkZZVzZPUjdQcUxCMGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6IjN5TCtWR29qajl0OUlxN2xIVnNyNi94aWdjU3pSZ2V0UHl2SHhMWnJoQms9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InhuaUVNZnI1VF8tb0M2TXVaam5MdlEiLCJwaG9uZUlkIjoiNDhlM2I4YWUtMmQ4NS00M2IwLWIzYjctMGQ2MzhlZjk5MDg4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF4VVBRci9ReGs5Q1JmSDQyTWtuQXJUbGoxWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoVU9hR0ZMdmNjMHpuZFBSRzdRaThHVUFYSGc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSk5WUVBKOEUiLCJtZSI6eyJpZCI6IjIzNDgwODYwNTE2OTU6MzZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05qUGo4WURFS1hrbnJZR0dCa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkQyQXhVeU5hOWdhaHpWVXloSEUrSHN0Q3RUeTBtZDJxbE9zS21Tcm9IRFk9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJtU0dQOXR5MG9LR2QzNXk2eWRDMkRxWGZJaVBCS3BybXBxTnMxZWRjMVRaMlVkdGltaFYyNXdXOHVNeHQybjU0L2J1c045cW5pZGNnMnVJR21uM0F3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGdVBtNmE3SW9BbENpcjdqb0ZoU3JiV1NNRjFsVTMzc3drT2k3WUpJd001MlRQdEl5NDhsNmxycVhUM3NHMXJpUktDeEREV3pGSHBEMXlmOTZkRDFoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwODYwNTE2OTU6MzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUTlnTVZNald2WUdvYzFWTW9SeFBoN0xRclU4dEpuZHFwVHJDcGtxNkJ3MiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDM2MzMxNH0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
