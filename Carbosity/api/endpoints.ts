const api = 'http://192.168.1.58:8080/api';

interface Endpoints {
    api: string;
    auth: {
        login: string;
    };
}

export const endpoints: Endpoints = {
    api,
    auth: {
        login: `${api}/auth/login`,
    },

}