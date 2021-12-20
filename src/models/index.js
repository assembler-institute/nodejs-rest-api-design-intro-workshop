const UserModel = require("./user-model");
const SongModel = require("./song-model");
const BookModel = require("./book-model");
const PublishersModel = require("./publishers-model");

module.exports = {
  User: UserModel,
  Song: SongModel,
  Book: BookModel,
  Publishers: PublishersModel,
};
