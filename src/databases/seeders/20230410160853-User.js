import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

export default {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    for (let i = 0; i < 10; i++) {
      const passwordHash = await bcrypt.hash('customer@12', 10);

      users.push({
        id: faker.datatype.uuid(),
        fullName: faker.internet.userName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
