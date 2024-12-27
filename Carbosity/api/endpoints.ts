const api = 'http://192.168.1.58:8085/api';

interface Endpoints {
    api: string;
    auth: {
        login: string;
        register: string;
    },
    electricity: {
        calculate: {
            emission: string
        }
    }
}

export const endpoints: Endpoints = {
    api,
    auth: {
        login: `${api}/auth/login`,
        register: `${api}/auth/register`,
    },
    electricity: {
        calculate: {
            emission: `${api}/electricity/calculate-emission`
        }
    }

}