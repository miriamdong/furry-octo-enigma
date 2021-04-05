//(credits to Andy https://github.com/andydlindsay/lectures/blob/master/w05d01/seeds/users_seed.js)

const faker = require('faker');

const desiredFakeUsers = process.argv[3] || 20000;
const batchSize = 5000;

const createFakeUser = () => ({
  username: faker.internet.userName(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  created: faker.date.date()
});

exports.seed = async (knex) => {
  let fakeUsers = [];
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
    if (fakeUsers.length >= batchSize) {
      await knex('users').insert(fakeUsers);
      fakeUsers = [];
    }
  }
  return knex('users').insert(fakeUsers);
};
