import axios, { CancelToken } from 'axios';

export const authSignInApi = {
    cancel: null,
    run: credentials => (
        axios.post('/api/auth/login', {
            credentials
        }, {
            cancelToken: new CancelToken(c => authSignInApi.cancel = c),
        })
        .then(({ data }) => data)
    )
};