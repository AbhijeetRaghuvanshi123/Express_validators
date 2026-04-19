import EmailUsersStorage from '../storages/emailUsersStorage.js';
import { body, validationResult, matchedData } from 'express-validator'

const alphaError = "must only contain letters.";
const fullNameLengthError = "must be between 4 to 20 characters."


const validateEmailUser = [
    body("name").trim()
        .isAlpha().withMessage(`Name ${alphaError}`)
        .isLength({ min: 4, max: 20 }).withMessage(`Name ${fullNameLengthError}`),
    body("email").trim()
        .isLength({ min: 6 }).withMessage(`Email must be atleast 6 character long`)
        .isEmail().withMessage(`Email is not valid`)
]

const emailUserCreateGet = (req, res) => {
    res.render("createEmailUser", { title: "Create Email user" });
}


const emailUserCreatePost = [
    validateEmailUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createEmailUser", {
                title: "Create Email User",
                errors: errors.array()
            })
        }
        const { name, email } = matchedData(req);
        EmailUsersStorage.addUser({ name, email });
        res.redirect("/");
    }
]

const emailUserUpadateGet = (req, res) => {
    const user = EmailUsersStorage.getUser(req.params.id);
    res.render("updateEmailUser", {
        title: "Update Email user",
        user: user
    })
}

const emailUserUpdatePost = [
    validateEmailUser,
    (req, res) => {
        const user = EmailUsersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateEmailUser", {
                title: "Update Email user",
                user: user,
                errors: errors.array()
            });
        }
        const { name, email } = matchedData(req);
        EmailUsersStorage.updateUser(req.params.id, { name, email });
        res.redirect("/");
    }
]

const emailUsersDeletePost = (req, res) => {
    EmailUsersStorage.deleteUser(req.params.id);
    res.redirect("/");
}

export {emailUserCreateGet, emailUserCreatePost, emailUserUpadateGet, emailUserUpdatePost, emailUsersDeletePost}