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
    }
};

export default firebase;