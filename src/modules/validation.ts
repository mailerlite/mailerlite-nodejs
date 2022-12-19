export function validateId (id: string): void {
    if (!id) {
        throw new Error("ID must be provided");
    }

    if (typeof id === 'number') { // Shouldn't use toString() because Number.MAX_SAFE_INTEGER < ID
        throw new Error("ID must be of type string");
    }
}
