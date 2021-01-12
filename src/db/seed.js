const db = require("../models");
const { getSeedUsers, getSeedBooks } = require("./seed-data");

async function seedUsers() {
  const users = getSeedUsers();

  await db.User.deleteMany({});
  await db.User.create([...users]);
}

async function seedBooks() {
  await db.Book.deleteMany({});
  return db.Book.insertMany(getSeedBooks());
}

function getRandomItem(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  seedUsers: seedUsers,
  seedBooks: seedBooks,
  getRandomItem: getRandomItem,
};
