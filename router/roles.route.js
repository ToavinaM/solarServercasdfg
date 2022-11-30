const DbConnect = require("../dbConnect");
const { RolesRepository } = require("../repository");
const { where } = require('../utils');
const route = require("express").Router();

////find all users, req.query.where is optional
route.get("", async function (req, res) {
    try {
        const whereObject = where(req.query.where);
        res.send(await RolesRepository.getAll(DbConnect, whereObject));
    } catch (error) {
        res.status(500).send(error.message)
    }
})
route.get("/:id", async function (req, res) {
    try {
        res.send(await RolesRepository.getById(DbConnect, +req.params.id))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = route 