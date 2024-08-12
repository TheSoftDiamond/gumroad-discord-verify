const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3');
require('dotenv').config();
const ownerID = process.env.OWNERID
const admidID = process.env.ADMINROLEID
const productid = process.env.GUMROADPRODUCTID
const databaseName = process.env.DATABASENAME

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify your license key from gumroad')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
                    option.setName('oldUserID')
                    .setDescription('Old User ID to migrate')
                    .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('newUserID')
            .setDescription('New User ID to usr')
            .setRequired(true)
        ),
    async execute(interaction) {
        
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const roleID = process.env.SUCCESSROLEID;
        const role = interaction.guild.roles.cache.get(roleID);
        const oldUser = interaction.options.getString('oldUserID');
        const newUser = interaction.options.getString('newUserID');
       
    },
};