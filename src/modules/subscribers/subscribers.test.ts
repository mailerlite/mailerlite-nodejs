import { describe, it, expect, expectTypeOf } from "vitest";
import { beforeAll, afterAll } from "vitest";
import { SubscriberEcommerceStatsResponse, SubscriberEcommerceOrdersResponse } from "./subscribers.types";
import "dotenv/config";
import MailerLite from '../../index';
import {
    CreateOrUpdateSubscriberParams,
    UpdateSubscriberParams,
    GetSubscribersParams,
    ListSubscribersResponse,
    SingleSubscriberResponse,
    CountSubscribersResponse
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
        const params: GetSubscribersParams = {
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

        const params: CreateOrUpdateSubscriberParams = {
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
            expect(response.data.data.id).toEqual(expect.any(String));
            expectTypeOf(response.data).toEqualTypeOf<SingleSubscriberResponse>()
            createdSubscriberId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a subscriber", async () => {
        const randomInt = getRandomInt();

        const params: UpdateSubscriberParams = {
            fields: {
                name: `Test name ${randomInt}`,
                last_name: `Test lastname ${randomInt}`,
                company: `test company ${randomInt}`,
                country: `test country ${randomInt}`,
                city: `test city ${randomInt}`,
                email: `test${randomInt}@nodejs.com`,
            },
            status: 'active',
            subscribed_at: '2022-11-23 09:59:56'
        };

        try {
            const response = await mailerlite.subscribers.update(createdSubscriberId,params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toEqual(expect.any(String));
            expectTypeOf(response.data).toEqualTypeOf<SingleSubscriberResponse>()
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
            expect(response.data.data.id).toEqual(expect.any(String));
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
            expectTypeOf(response.data).toEqualTypeOf<CountSubscribersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    // Forget endpoint test skipped. If sub is forgotten, it can't be deleted

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

describe("Subscriber e-commerce reports", () => {

    let shopId: string;
    let subscriberId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({ name: "Test shop nodejs subscribers-reports", url: "https://shop.example.com", currency: "EUR" });
        shopId = response.data.data.id;

        const subscribers = await mailerlite.subscribers.get({ limit: 1 });
        if (subscribers.data.data.length) subscriberId = subscribers.data.data[0].id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    it("Fetch subscriber e-commerce stats", async ({ skip }) => {
        skip(!subscriberId);

        try {
            const response = await mailerlite.subscribers.getEcommerceStats(subscriberId, { shop_id: shopId });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SubscriberEcommerceStatsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch subscriber e-commerce orders", async ({ skip }) => {
        skip(!subscriberId);

        try {
            const response = await mailerlite.subscribers.getEcommerceOrders(subscriberId, { shop_id: shopId, limit: 10 });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SubscriberEcommerceOrdersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

});
