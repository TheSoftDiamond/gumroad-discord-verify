# gumroad-discord-verify

A simple discord bot that I created that will allow users to verify a license key for a given product id. Once this is done the user will be a given a role. This bot only works in the server ID that it is binded to within the .envfile.

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
