import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    CreateOrUpdateParams,
    GetParams,
    ListSubscribersResponse,
    SingleSubscriberResponse,
    SubscribersCountResponse
} from "./subscribers.types";
import {getRandomInt, handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Subscribers", () => {

    let createdSubscriberId: string;

    it.concurrent("List Subscribers", async () => {
        const params: GetParams = {
            filter: {
                status: "active" // possible statuses: active, unsubscribed, unconfirmed, bounced or junk.
            },
            limit: 5
        };

        try {
            const response = await mailerlite.subscribers.get(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListSubscribersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create or update a subscriber", async () => {
        const randomInt = getRandomInt();

        const params: CreateOrUpdateParams = {
            email: `test${randomInt}@nodejs.com`,
            fields:	{
                name: `Test name ${randomInt}`,
                last_name: `Test lastname ${randomInt}`,
                company: `test company ${randomInt}`,
                country: `test country ${randomInt}`,
                city: `test city ${randomInt}`
            },
            status:	'active',
            subscribed_at: '2022-11-23 09:59:56'
        };

        try {
            const response = await mailerlite.subscribers.createOrUpdate(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleSubscriberResponse>()
            createdSubscriberId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a subscriber by ID", async () => {
        try {
            const response = await mailerlite.subscribers.find(createdSubscriberId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleSubscriberResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it.concurrent("Fetch total subscribers count", async () => {
        try {
            const response = await mailerlite.subscribers.getCount();

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SubscribersCountResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a subscriber", async () => {
        try {
            const response = await mailerlite.subscribers.delete(createdSubscriberId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
        } catch (error) {
            handleCatchedError(error);
        }
    });

});
