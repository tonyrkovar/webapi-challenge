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
    const actionID = req.params.id
    projectDB.get(req.params.project_id)
        .then(actions => {
            if (actions) {
                db.get(actionID)
                    .then(action => {
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

router.post('/:project_id/action/', (req, res) => {
    const newAction = req.body;
    projectDB.get(req.params.project_id)
        .then(action => {
            db.insert(newAction)
                .then(success => {
                    res.status(200).json(success)
                })
                .catch(err => {
                    res.status(500).json({ error: "unable to post new Action" })
                })
        })
        .catch(err => {
            res.status(500).json({ error: "Unable to get proper project" })
        })
})

router.put('/:project_id/action/:id', validateProject, (req, res) => {
    const updateAction = req.body;
    projectDB.get(req.params.project_id)
        .then(action => {
            db.update(req.params.id, updateAction)
                .then(updated => {
                    res.status(200).json(updated)
                })
                .catch(err => {
                    res.status(500).json({ error: `Unable to update action ${action.name}` })
                })
        })
        .catch(err => {
            res.status(500).json({ error: "Cannot retreive project" })
        })
})

router.delete('/:project_id/action/:id', validateProject, (req, res) => {
    projectDB.get(req.params.project_id)
        .then(action => {
            db.remove(req.params.id)
                .then(deleted => {
                    res.status(200).json(deleted)
                })
        })
        .catch(() => {
            res.status(500).json("Could not reach that project")
        })
})

function validateProject(req, res, next) {
    projectDB.get(req.params.project_id)
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