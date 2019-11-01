const express = require('express')
const db = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `Bad request; ${err}` })
        })
})

router.get('/:id', (req, res) => {
    db.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
})

router.post('/', (req, res) => {
    const project = req.body;
    db.insert(project)
        .then(newProj => {
            res.status(200).json(newProj)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `Bad request; ${err}` })
        })
})

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(removed => {
            res.status(200).json(removed)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `Bad request; ${err}` })
        })
})

router.put('/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params
    db.get(id)
        .then(project => {
            if (project) {
                db.update(id, data)
                    .then(newProj => {
                        res.status(200).json({ message: `User updated successfully` })
                    })
                    .catch(err => {
                        res.status(500).json({ errorMessage: `Bad request; ${err}` })
                    })
            } else {
                res.status(401).json({ errorMessage: "This project does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `Bad request; ${err}` })
        })
})

module.exports = router;