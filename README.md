# Discord-Js-Template

A Template for future bots that I write, most code will be similar to this starting out.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [Discord Developer Portal](https://discord.com/developers/applications) account to create your bot
- [Discord.JS](https://discord.js.org/) (v14.x or higher)

### Setup
1. To setup run the following commands
```npm
npm install discord.js
npm install dotenv
npm install sqlite3
```

2. Populate the categories in the .env file (Rename env.example to .env):
```env   
DISCORD_TOKEN=""
CLIENTID = ""
OWNERID = ""
ADMINROLEID = ""
SERVERID = ""
GUMROADPRODUCTID = ""
SUCCESSROLEID=""
```

You may need to run `node deploy-commands`
