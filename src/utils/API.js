import axios from 'axios';

const API_BASE_URL = 'https://5dih1d57x5.execute-api.us-west-1.amazonaws.com/Prod';

export const loginApi = (accessToken) => {
    const loginApi = '/loginWithGoogle';
    console.log("API CALLED: " + loginApi)
    let options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    return axios.post(API_BASE_URL + loginApi, {}, options)
        .then(result => {
            return result.data.body;
        }).catch(err => {
            console.log(err);
            return err;
        });
}