const db = require("../models/");
async function getUsers(req, res, next) {
    try {
        const users = await db.User.find({}).lean().exec();
        console.log(users)
        res.status(200).send({
            data: users
        })
    } catch (err) {
        next(err);
    }
}


async function getSingleUser(req, res, next) {
    try {
        const userId = req.params['userId']
        console.log(userId)
        const user = await db.User.find({ "_id": userId }).lean().exec();
        res.status(200).send({
            data: user
        })
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const userId = req.params['userId']
        const data = req.body
        console.log(userId, data)
        const response = await db.User.findByIdAndUpdate(userId, {...data }, { new: true }).lean().exec()
        res.status(202).send({
            data: response
        })
    } catch (err) {
        next(err)
    }
}

async function createUser(req, res, next) {
    try {
        data = req.body
        const dbRes = await db.User.create(data)
        res.status(201).send({
            success: true,
            data: dbRes
        })
    } catch (err) {
        return next(err)
    }
}

async function deleteUser(req, res, next) {
    try {
        const userId = req.params['userId'];
        await db.User.findByIdAndDelete({ "_id": userId }).lean().exec()
    } catch (err) {
        next(err)

    }
}

module.exports = {
    getUsers: getUsers,
    getSingleUser: getSingleUser,
    updateUser: updateUser,
    createUser: createUser,
    deleteUser: deleteUser
}