import axios, {AxiosError} from "axios";

export function handleCatchedError(error: AxiosError | any) {
    if (axios.isAxiosError(error))  {
        // Access to config, request, and response
        throw (error.response && error.response.data);
    } else {
        // Just a stock error
        throw error;
    }
}

export function getRandomInt() {
    const min = Math.ceil(100000);
    const max = Math.floor(999999);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
