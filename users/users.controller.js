﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
// router.post('/authenticate', authenticate);     // public route
// router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
// router.get('/:id', getById);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

// function getById(req, res, next) {
//     userService.getById(req.params.id)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // // only allow admins to access other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}