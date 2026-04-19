import { redirect } from 'react-router-dom';
import UsersStorage from '../storages/usersStorage.js';
import { body, validationResult, matchedData } from 'express-validator'

const alphaError = "must only contain letters.";
const lengthError = "must be between 1 to 10 characters.";

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaError}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthError}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaError}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthError}`)
]

const usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create user"
    });
}

const usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            })
        }
        const { firstName, lastName } = matchedData(req);
        UsersStorage.addUser({ firstName, lastName });
        res.redirect("/");
    }
]

const usersUpdateGet = (req, res) => {
    const user = UsersStorage.getUser(req.params.id);
    res.render("updateUser", {
        title: "Update user",
        user: user
    });
};

const usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = UsersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update User",
                user: user,
                errors: errors.array()
            });
        };
        const { firstName, lastName } = matchedData(req);
        UsersStorage.updateUser(req.params.id, { firstName, lastName });
        res.redirect("/");
    }
]

const usersDeletePost = (req, res) => {
    UsersStorage.deleteUser(req.params.id);
    res.redirect("/");
}

export { usersCreateGet, usersCreatePost, usersUpdateGet, usersUpdatePost, usersDeletePost };