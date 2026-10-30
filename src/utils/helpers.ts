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

export function validateId (id: string): void {
    if (!id) {
        throw new Error("ID must be provided");
    }

    if (typeof id === 'number') { // Shouldn't use toString() because Number.MAX_SAFE_INTEGER < ID
        throw new Error("ID must be of type string");
    }
}

// IDs go into the URL path as-is, so anything but digits (e.g. "1/html" or "../../subscribers/1") could reach another endpoint.
// Encoding is not enough: the API decodes %2F.
export function validateNumericId (id: string): void {
    validateId(id);

    if (!/^[0-9]+$/.test(id)) {
        throw new Error("ID must contain only digits");
    }
}
