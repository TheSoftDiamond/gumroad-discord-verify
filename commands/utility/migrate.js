const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const database = require('../../deploy-database.js');
require('dotenv').config();
const ownerID = process.env.OWNERID
const admidID = process.env.ADMINROLEID
const productid = process.env.GUMROADPRODUCTID
const databaseName = process.env.DATABASENAME

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('migrate')
        .setDescription('Verify your license key from gumroad')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
                    option.setName('olduserid')
                    .setDescription('Old User ID to migrate')
                    .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('newuserid')
            .setDescription('New User ID to use')
            .setRequired(true)
        ),
    async execute(interaction) {
        
        const roleID = process.env.SUCCESSROLEID;
        const role = interaction.guild.roles.cache.get(roleID);
        const oldUser = interaction.options.getString('olduserid');
        const newUser = interaction.options.getString('newuserid');

        if (database.migrateUser(oldUser, newUser)) {
            const oldMember = await interaction.guild.members.fetch(oldUser);
            const newMember = await interaction.guild.members.fetch(newUser);

            if (oldMember && newMember) {
                oldMember.roles.remove(role);
                newMember.roles.add(role);

                await interaction.reply({ content:`${oldUser} successfully migrated to ${newUser}`, ephemeral: true });
            } else if (!oldMember) {
                await interaction.reply({ content:`Unable to find old member. Verify that the user id are correct.`, ephemeral: true });
            } else if (!newMember) {
                await interaction.reply({ content:`Unable to find new member. Verify that the user id are correct.`, ephemeral: true });
            }
        } else {
            await interaction.reply({ content:`Migration failed. Old member not found in the database`, ephemeral: true });
        }
    },
};