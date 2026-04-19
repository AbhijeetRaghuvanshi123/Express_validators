class UsersStorage{
    constructor(){
        this.storage = [];
        this.id = 0;
    }

    addUser({ firstName, lastName }){
        const id = this.id;
        this.storage[id] = {id, firstName, lastName};
        this.id++;
    }

    getUsers(){
        return Object.values(this.storage);
    }

    getUser(id){
        return this.storage[id];
    }

    updateUser(id, {firstName, lastName}){
        this.storage[id] = {id, firstName, lastName};
    }

    deleteUser(id){
        delete this.storage[id];
    }

    getUserByFirstName(firstName){
        return this.storage.find(user => user.firstName === firstName);
    }

    getUserByLastName(lastName){
        return this.storage.find(user => user.lastName === lastName);
    }
}

export default new UsersStorage();