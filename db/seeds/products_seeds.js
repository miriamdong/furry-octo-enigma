/* eslint-disable camelcase */
// credits to Andy https://github.com/andydlindsay/lectures/blob/master/w05d01/sql/books_seed.js

const faker = require('faker');

const genRandom = (max) => {
  return Math.floor(Math.random() * max);
};

const genPastDate = () => {
  const dateObj = new Date(faker.date.past());
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return `${month} ${day}, ${year}`;
};

const artists = [];
for (let i = 0; i < 20; i++) {
  artists.push(`${faker.name.firstName()} ${faker.name.lastName()}`);
}

const publishers = [];
for (let i = 0; i < 10; i++) {
  publishers.push(faker.company.companyName());
}

const products = [];
for (let i = 0; i < 25; i++) {
  products.push(faker.commerce.productName());
}

const createFakeProducts = () => {
  return {
    name: products[genRandom(products.length)],
    genre: faker.music.genre(),
    artist: artists[genRandom(artists.length)],
    publisher: publishers[genRandom(publishers.length)],
    release_year: faker.date.getUTCFullYear(),
    created_at: genPastDate(),
    description: faker.commerce.productDescriptions(),
    price: faker.commerce.price(),
    quantity: faker.random.number(),
    img: faker.image.imageURL()
  };
};

exports.seed = async function(knex) {
  const fakeProducts = [];
  const desiredFakeProducts = 500;
  for (let i = 0; i < desiredFakeProducts; i++) {
    fakeProducts.push(createFakeProducts());
  }
  await knex('Products').insert(fakeProducts);
};
