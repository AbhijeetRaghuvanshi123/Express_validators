import { redirect } from "react-router-dom";
import EmailUsersStorage from "../storages/emailUsersStorage.js";
import UsersStorage from "../storages/usersStorage.js";

const usersListGet = (req, res) => {
    res.render("index", { title: "User list", users: UsersStorage.getUsers(), emailUsers: EmailUsersStorage.getUsers() });
}

const userListSearchGet = (req, res) => {
    let searchResult;
    let userType;
    switch (req.query.dataType) {
        case 'firstName':
            searchResult = UsersStorage.getUserByFirstName(req.query.searchValue);
            userType = 'user';
            break;
        
        case 'lastName':
            searchResult = UsersStorage.getUserByLastName(req.query.searchValue);
            userType = 'user';
            break;
            
        case 'name':
            searchResult = EmailUsersStorage.getUserByName(req.query.searchValue);
            userType = 'emailUser';
            break;

        case 'email':
            searchResult = EmailUsersStorage.getUserByEmail(req.query.searchValue);
            userType = 'emailUser';
            break;

        default:
            break;
    }
    if(searchResult != undefined){
        res.render("index", {title: "User list", searchResult: searchResult, userType: userType})
    }
    else{
        redirect('/');
    }
}

export { usersListGet , userListSearchGet};