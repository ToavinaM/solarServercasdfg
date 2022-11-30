const { multerHandler } = require("../config");
const query = require("../dbConnect");
const { Files } = require("../models");
const { TicketsRepository, FilesRepository } = require("../repository");

const { where, makeId } = require('../utils');
const router = require("express").Router();
router.get("", async function (req, res) {
    try {
        const whereObject = where(req.query.where);
        res.send(await TicketsRepository.getAll(query, whereObject));
    } catch (error) {
        res.status(500).send(error.message)
    }
})



router.post("", multerHandler, async function (req, res) {
    try {
        req.body.code = makeId(20);

        console.log('WWWWWWWWinasd', req.body);
        if (req.body.mother.id === '') req.body.mother.id = null;
        await TicketsRepository.save(query, req.body);
        const newTicket = await TicketsRepository.getByCode(query, req.body.code)
        // console.log('users', newTicket);
        for (let f of req.files || []) {
            console.log(f);
            let newFiles = new Files();
            newFiles.extension = f.filename.substring(f.filename.lastIndexOf('.'));
            newFiles.name = f.originalname;
            newFiles.mimetype = f.mimetype;

            newFiles.filesPath = f.path;
            newFiles.tickets = newTicket;
            await FilesRepository.save(query, newFiles);
        }

        res.send(await TicketsRepository.getByCode(query, req.body.code));
        // res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


router.put("/:code", async function (req, res) {
    try {
        let updateTickets = { title: req.body.title, description: req.body.description, status: req.body.status }
        res.send(await TicketsRepository.update(query, req.params.code, updateTickets));
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.delete("/:code", async function (req, res) {
    try {
        // console.log(req.body);
        await TicketsRepository.delete(query, req.params.code);
        res.send({ data: 'success' });
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/:id", async function (req, res) {
    try {
        res.send(await TicketsRepository.getById(query, +req.params.id))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get("/code/:code", async function (req, res) {
    try {
        res.send(await TicketsRepository.getByCode(query, req.params.code))
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.get("/reply/:id", async function (req, res) {
    try {
        console.log(req.params.id);
        let tickets = await TicketsRepository.getAll(query, { idMother: req.params.id });
        res.send(tickets)
    } catch (error) {
        res.status(500).send(error.message)
    }
})












module.exports = router 