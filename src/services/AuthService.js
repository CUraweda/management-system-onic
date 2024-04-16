import axios from 'axios';

const API_URL = 'https://api-prmn.curaweda.com:3000/api/auth';

const AuthService = {
    signIn: async (email, password) => {
        const response = await axios.post(`${API_URL}/signin`, { email, password });
        return response.data.token;
    },
};

export default AuthService;
