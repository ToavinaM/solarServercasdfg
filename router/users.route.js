const DbConnect = require("../dbConnect");
const { UsersRepository } = require("../repository");
const { where } = require('../utils');
const route = require("express").Router();

////find all users, req.query.where is optional
route.get("", async function (req, res) {
    try {
        const whereObject = where(req.query.where);
        res.send(await UsersRepository.getAll(DbConnect, whereObject))
    } catch (error) {
        res.status(500).send(error.message)
    }
})
route.get("/:id", async function (req, res) {
    try {
        res.send(await UsersRepository.getById(DbConnect, +req.params.id))
    } catch (error) {
        res.status(500).send(error.message)
    }
})
route.delete("/:id", async function (req, res) {
    try {
        let deleteUser = await UsersRepository.getById(DbConnect, +req.params.id)
        res.send(await UsersRepository.delete(DbConnect, deleteUser))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = route 
