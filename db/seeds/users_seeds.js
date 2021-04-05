//(credits to Andy https://github.com/andydlindsay/lectures/blob/master/w05d01/seeds/users_seed.js)


const faker = require('faker');
const moment = require('moment');

const start = moment().startOf('month').subtract(1, 'days').format('MMM D, YYYY');
const end = moment().endOf('month').add(1, 'days').format('MMM D, YYYY');
const desiredFakeUsers = process.argv[3] || 20000;
const batchSize = 5000;

const createFakeUser = () => ({
  userName: faker.internet.userName(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
  city: faker.address.city(),
  street: faker.address.streetAddress(),
  state: faker.address.state(),
  postal: faker.address.zipCode(),
  country: faker.address.country(),
  created: faker.date.date(start)
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
