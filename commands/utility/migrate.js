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

        if (oldUser === newUser) {
            await interaction.reply({ content: `Old and new user ids should be different`, ephemeral: true });
            return;
        }

        let oldMember, newMember;
        try {
            oldMember = await interaction.guild.members.fetch(oldUser);
            newMember = await interaction.guild.members.fetch(newUser);
        } catch (err) { }

        if (oldMember && newMember) {
            database.migrateUser(oldUser, newUser).then(async () => {
                oldMember.roles.remove(role);
                newMember.roles.add(role);
            }).catch(async err => {
                await interaction.reply({ content: `Migration failed. Error: ${err.message}`, ephemeral: true });
                database.migrateUser(newUser, oldUser); // Rollback the migration to the new user
            });

            await interaction.reply({ content: `${oldUser} successfully migrated to ${newUser}`, ephemeral: true });
        } else if (!oldMember) {
            await interaction.reply({ content: `Unable to find old member. Verify that the old user id is correct.`, ephemeral: true });
        } else if (!newMember) {
            await interaction.reply({ content: `Unable to find new member. Verify that the new user id is correct.`, ephemeral: true });
        }
    },
};