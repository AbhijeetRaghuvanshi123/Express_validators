class EmailUserStorage{
    constructor(){
        this.storage = [];
        this.id = 0;
    }

    addUser({ name, email }){
        const id = this.id;
        this.storage[id] = { id, name, email};
        this.id++;
    }

    getUsers(){
        return Object.values(this.storage);
    }

    getUser(id){
        return this.storage[id];
    }

    updateUser(id, {name, email}){
        this.storage[id] = {id, name, email};
    }

    deleteUser(id){
        delete this.storage[id];
    }

    getUserByName(name){
        return this.storage.find(user => user.name === name);
    }

    getUserByEmail(email){
        return this.storage.find(user => user.email === email);
    }
}

export default new EmailUserStorage();