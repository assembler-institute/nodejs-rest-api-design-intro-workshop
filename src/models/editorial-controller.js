const db = require("../models/");

async function createEditorial(req, res, next) {
    try {
        data = req.body
        const dbRes = await db.Editorial.create(data);
        res.status(201).send({
            success: true,
            data: dbRes
        })
    } catch (err) {
        next(err)
    }
}



async function getEditorials(req, res, next) {
    try {
        const users = await db.Editorial.find({}).lean().exec();
        console.log(users)
        res.status(200).send({
            data: users
        })
    } catch (err) {
        next(err);
    }
}


async function getSingleEditorial(req, res, next) {
    try {
        const editorialId = req.params['editorialId']
        const editorial = await db.Editorial.find({ "_id": editorialId })
            .populate('authors', ['firstName', 'lastName'])
            .populate('books', ['title'])
            .exec()
        res.status(200).send({
            data: editorial
        })
    } catch (err) {
        next(err);
    }
}

async function updateEditorial(req, res, next) {
    try {
        const editorialId = req.params['editorialId']
        const data = req.body
            // console.log(editorialId)
        const response = await db.Editorial.findByIdAndUpdate(editorialId, {...data }).lean().exec()
        res.status(202).send({
            data: response
        })
    } catch (err) {
        next(err)
    }
}

async function deleteEditorial(req, res, next) {
    try {
        const editorialId = req.params['editorialId'];
        await db.Editorial.findByIdAndDelete({ "_id": editorialId }).lean().exec()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createEditorial: createEditorial,
    getEditorials: getEditorials,
    getSingleEditorial: getSingleEditorial,
    updateEditorial: updateEditorial,
    deleteEditorial: deleteEditorial,
}