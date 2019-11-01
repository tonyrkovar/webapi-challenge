const express = require('express')

const db = require('../data/helpers/actionModel')

const projectDB = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/:project_id/action/', validateProject, (req, res) => {
    projectDB.get(req.params.project_id)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions.actions)
            } else {
                res.status(400).json({ error: "There are no actions here" })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "bad request" })
        })

})

router.get('/:project_id/action/:id', validateProject, (req, res) => {
    // db.get(req.params.id)
    //     .then(action => {
    //         res.status(200).json(action)
    //     })
    //     .catch(err => {
    //         res.status(500).json("Bad request")
    //     })
    projectDB.get(req.params.project_id)
        .then(actions => {
            if (actions) {
                db.get(req.project.id)
                    .then(action => {
                        console.log(action.project_id)
                        console.log(req.params.project_id)
                        if (`${action.project_id}` === req.params.project_id) {
                            res.status(200).json(action)
                        } else {
                            res.status(400).json({ error: "that action does not exist" })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'bad request' })
                    })
            } else {
                res.status(401).json({ error: "There is no project here" })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "bad request" })
        })
})

// router.update('/:project_id/action/:id', )

function validateProject(req, res, next) {
    projectDB.get(req.params.id)
        .then(project => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(400).json({ errorMessage: "That project does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ Error: 'bad request' })
        })
}

module.exports = router;