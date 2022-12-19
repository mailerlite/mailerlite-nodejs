export function validateSubscriberId (subscriber_id: string): void {
    if (typeof subscriber_id === 'number') { // Shouldn't use parseInt() because Number.MAX_SAFE_INTEGER < subscriber_id
        throw new Error("subscriber_id must be of type string");
    }

    if (!subscriber_id) {
        throw new Error("Subscriber ID must be provided");
    }
}
