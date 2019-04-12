
import {
    accesskey,
    url
} from '../constants/constants';

export function getImages() {
    return fetch(url + accesskey, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (!responseJson.error) {
                return responseJson;
            } else {
                return responseJson;
            }
        })
        .catch(function (error) {
            return error;
        });
}