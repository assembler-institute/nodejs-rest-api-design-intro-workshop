const db = require("../models");

async function getPublishers(req, res, next) {
  try {
    const publishers = await db.Publishers.find({})
      .select({
        name: 1,
        year: 1,
      })
      .limit(10)
      .lean()
      .exec();

    res.status(200).send({
      data: publishers,
    });
  } catch (error) {
    next(error);
  }
}

async function getPublishersDetails(req, res, next) {
  const { publishersId } = req.params;

  try {
    const publishers = await db.Publishers.findOne({
      _id: publishersId,
    })
      .select("-password -__v -createdAt -updatedAt")
      .lean()
      .exec();

    res.status(200).send({
      data: publishers,
    });
  } catch (error) {
    next(error);
  }
}

async function createPublishers(req, res, next) {
  const { name, authors, books, year } = req.body;

  try {
    const publishers = await db.Publishers.create({
      name,
      authors,
      books,
      year,
    });

    res.status(200).send({
      data: {
        _id: publishers._id,
        name: publishers.name,
        authors: publishers.authors,
        books: publishers.books,
        year: publishers.year,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updatePublishers(req, res, next) {
  const { publishersId } = req.params;
  const { name, year } = req.body;

  try {
    const updatedpublishers = await db.Publishers.findOneAndUpdate(
      {
        _id: publishersId,
      },
      {
        $set: {
          name: name,
          year: year,
        },
      },
      {
        new: true,
      },
    ).select({
      name: 1,
      year: 1,
    });

    res.status(200).send({
      data: updatedpublishers,
    });
  } catch (error) {
    next(error);
  }
}

async function deletePublishers(req, res, next) {
  const { publishersId } = req.params;

  try {
    const result = await db.Publishers.deleteOne({
      _id: publishersId,
    }).lean();

    if (result.ok === 1 && result.deletedCount === 1) {
      res.status(200).send({
        data: "Publisher removed",
      });
    } else {
      res.status(500).send({
        data: "Publisher not removed",
      });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getPublishers: getPublishers,
  getPublishersDetails: getPublishersDetails,
  createPublishers: createPublishers,
  updatePublishers: updatePublishers,
  deletePublishers: deletePublishers,
};
