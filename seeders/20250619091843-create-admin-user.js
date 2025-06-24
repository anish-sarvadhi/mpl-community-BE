'use strict';
const bcrypt = require('bcrypt');

const hashedPassword = bcrypt.hashSync('Admin@123', 10);

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if admin user already exists
    const [existingUsers] = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE user_name = 'admin' LIMIT 1`
    );

    if (existingUsers.length === 0) {
      await queryInterface.bulkInsert('users', [
        {
          first_name: 'Main',
          last_name: 'Admin',
          user_name: 'admin',
          email: 'admin@example.com',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log('✅ Admin user added successfully.');
    } else {
      console.log('⚠️ Admin user already exists.');
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('users', { user_name: 'admin' }, {});
      console.log('🗑️ Admin user removed successfully.');
    } catch (error) {
      console.error('❌ Error removing admin user:', error);
    }
  }
};
