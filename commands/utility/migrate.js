const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();
const ownerID = process.env.OWNERID
const admidID = process.env.ADMINROLEID
const productid = process.env.GUMROADPRODUCTID

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify your license key from gumroad')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
                    option.setName('OldUserID')
                    .setDescription('Old User ID to migrate')
                    .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('NewUserID')
            .setDescription('New User ID to usr')
            .setRequired(true)
        ),
    async execute(interaction) {
        
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const roleID = process.env.SUCCESSROLEID;
        const role = interaction.guild.roles.cache.get(roleID);
        const OldUser = interaction.options.getString('OldUserID');
        const NewUser = interaction.options.getString('NewUserID');
       
    },
};