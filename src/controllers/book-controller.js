const db = require("../models");
const { logger } = require("../config/config");

/**
 * 1. Create the book CRUD controllers
 *
 * 1.1.1 create the book and return it
 *
 * The controller should create a new book from the parameters
 * it receives in the req.body object
 *
 * it will receive the following properties:
 *
 *    title: String
 *    author: String
 *    genre: String
 *    year: Number
 *    pages: Number
 *
 * The controller should return a response that has
 * a `data` property with a value of the `_id`
 * of the newly created book
 *
 * { data: `_idOfTheBookThatWasCreated` }
 *
 * 1.1.2 return a status code of `201`
 *
 * @note
 *
 * If you want to test the endpoint using Postman
 * you will have to first query for a user to get its `_id`
 * to send it to the book endpoint as the `author`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 */
// async function createBook() {}
const createBook = async (req, res, next) => {
  const { title, author, genre, year, pages } = req.body;

  try {
    const newBook = await db.Book.create({
      title,
      author,
      genre,
      year,
      pages,
    });

    res.status(201).send({
      data: {
        _id: newBook._id,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        year: newBook.year,
        pages: newBook.pages,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 1. Create the book CRUD controllers
 *
 * 1.2.1 get all the book ids and titles
 *
 * The controller should return an array of all the book titles and ids
 *
 * { data: [{ _id: "...", title: "..." }, ...] }
 *
 * 1.2.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 *
 * And call lean() and exec() on the query
 */
// async function getBooks() {}
const getBooks = async (req, res, next) => {
  try {
    const allBooks = await db.Book.find({})
      .select({
        title: 1,
      })
      .lean()
      .exec();

    res.status(200).send({
      data: allBooks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 1. Create the book CRUD controllers
 *
 * 1.3.1 get the book and author info
 *
 * The controller should fetch the book that has the `_id` it receives
 * as a request param and return the following fields
 * under a data property in the response:
 *
 *     _id
 *     title
 *     pages
 *     author:
 *        _id
 *        firstName
 *        lastName
 *
 * { data: { the book }}
 *
 * @note
 * you will need to use the populate method
 *
 * .populate({ path: "author", select: { field: 1 }})
 *
 * 1.3.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 *
 * And call lean() and exec() on the query
 */
async function getSingleBook() {}

/**
 * 1. Create the book CRUD controllers
 *
 * 1.4.1 update the book and return the updates
 *
 * The controller should fetch the book that has the `_id` it receives
 * as a request param and modify the following fields:
 *
 *     title
 *     pages
 *
 * You can use the `.findOneAndUpdate()` method
 *
 * @note
 * you will have to return the `new` updated document
 * under a `data` property of the response
 *
 * { data: { new doc }}
 *
 * 1.4.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 */
async function updateBook() {}

/**
 * 1. Create the book CRUD controllers
 *
 * 1.5.1 delete the book and return it
 *
 * The controller should fetch the book that has the `_id` it receives
 * as a request param and delete it from the database
 *
 * You will have to return the deleted document `_id` by using the `.findOneAndDelete()` method
 *
 * { data: { _id: deleted doc id }}
 *
 * 1.5.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 */
async function deleteBook() {}

module.exports = {
  createBook: createBook,
  getBooks: getBooks,
  getSingleBook: getSingleBook,
  updateBook: updateBook,
  deleteBook: deleteBook,
};
