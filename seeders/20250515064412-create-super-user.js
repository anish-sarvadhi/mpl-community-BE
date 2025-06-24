'use strict';
const bcrypt = require('bcrypt');

const hashedPassword = bcrypt.hashSync('Superadmin@123', 10);

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if superadmin user already exists
    const [existingUsers] = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE user_name = 'superadmin' LIMIT 1`
    );

    if (existingUsers.length === 0) {
      await queryInterface.bulkInsert('users', [
        {
          first_name: 'Super',
          last_name: 'Admin',
          user_name: 'superadmin',
          email: 'superadmin@example.com',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log('✅ Superadmin user added successfully.');
    } else {
      console.log('⚠️ Superadmin user already exists.');
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('users', { user_name: 'superadmin' }, {});
      console.log('🗑️ Superadmin user removed successfully.');
    } catch (error) {
      console.error('❌ Error removing superadmin user:', error);
    }
  }
};
