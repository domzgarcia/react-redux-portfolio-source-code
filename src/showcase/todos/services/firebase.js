import axios from 'axios';

const baseUrl = 'https://useridentity-555c1.firebaseio.com/';

const firebase = {
    getAll : async () => {
        try {
            const response = await axios.get(baseUrl.concat('todos.json'));
            return response;
        } catch (e) {
            if(e) return undefined;
        }
    },
    editTodo : async (uuid, name) => {
        try {
            const response = await axios.patch(baseUrl.concat(`todos/todos/${uuid}/.json`), {name});
            return response;
        } catch (e) {
            if(e) return undefined;
        }
    },
    markedAsDone : async (uuid, bool) => {
        try {
            const response = await axios.patch(baseUrl.concat(`todos/todos/${uuid}/.json`), {done : bool});
            return response;
        } catch (e) {
            if(e) return undefined;
        }
    },
    addTodo: async (object) => {
        try {
            const response = await axios.post(baseUrl.concat(`todos/todos/.json`), 
            object);

            return response;
        } catch (e) {
            if(e) return undefined;
        }
    },
    deleteTodo: async (uuid) => {
        try {
            const response = await axios.delete(baseUrl.concat(`todos/todos/${uuid}.json`));
            return response;
        } catch (e) {
            if(e) return undefined;
        }
    },
    syncId: async (id) => {
        try {
            const response = await axios.patch(baseUrl.concat(`todos/todos/${id}/.json`), 
            {uuid: id});

            return response;
        } catch (e) {
            if(e) return undefined;
        }
    }
};

export default firebase;