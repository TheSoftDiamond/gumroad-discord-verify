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
        .setName('verify')
        .setDescription('Verify your license key from gumroad')
        .addStringOption(option =>
            option.setName('licensekey')
                .setDescription('The license key you received from gumroad')
                .setRequired(true)
        ),
    async execute(interaction) {
        
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const roleID = process.env.SUCCESSROLEID;
        const role = interaction.guild.roles.cache.get(roleID);
        const licensekey = interaction.options.getString('licensekey');

        fetch('https://api.gumroad.com/v2/licenses/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              'product_id': productid,
              'license_key': licensekey,
            }),
          })
          .then(response => response.json())
          .then(async data => {
            console.log(data);
            let status = data.success;
            if (status) {
              if (role) {
                database.checkLicense(licensekey)
                  .then(async isValid => {
                    if (isValid) {
                      await member.roles.add(role);
                      await interaction.reply({ content: `Your license key has been verified`, ephemeral: true });
                      database.insertUser(interaction.user.id, licensekey);
                    } else {
                      await interaction.reply({ content: `This key has already been used by another user`, ephemeral: true });
                      console.log('%s tried to redeem a license key that has already been used: %s', interaction.user.tag, licensekey);
                    }
                  }).catch(err => console.error('Error checking license: ', err));
              } else {
                await interaction.reply({ content: 'Role not found.', ephemeral: true });
              }
            }
            else {
              await interaction.reply({ content: `Your license key was not able to be verified or was an invalid key`, ephemeral: true });
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
    },
};