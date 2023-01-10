import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../MailerLite';
import {
    GetParams,
    ListAllGroupsResponse,
    CreateUpdateParams,
    SingleGroupResponse,
    ListAllSubscribersResponse,
    SubscriberParams
} from "./groups.types";
import {getRandomInt, handleCatchedError} from "../helpers";
import {CreateOrUpdateParams, SingleSubscriberResponse} from "../subscribers/subscribers.types";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
});

describe("Groups", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    let createdGroupId: string;
    let createdSubscriberId: string;

    it.concurrent("List all groups", async () => {
        const params: GetParams = {
            limit: 5,
            page: 1,
            sort: "name" // name, total, open_rate, click_rate, created_at,
        };

        try {
            const response = await mailerlite.groups.get(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAllGroupsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a group", async () => {
        const randomInt = getRandomInt();
        const params: CreateUpdateParams = {
            name: `Test group nodejs ${randomInt}`
        };

        try {
            const response = await mailerlite.groups.create(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleGroupResponse>()
            createdGroupId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a group", async () => {
        const randomInt = getRandomInt();
        const params: CreateUpdateParams = {
            name: `Test group updated nodejs ${randomInt}`
        };

        try {
            const response = await mailerlite.groups.update(createdGroupId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleGroupResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get subscribers belonging to a group", async () => {
        const params: SubscriberParams = {
            filter: {
                status: "active" // active, unsubscribed, unconfirmed, bounced or junk
            },
            limit: 5,
            page: 1
        };

        try {
            const response = await mailerlite.groups.getSubscribers(createdGroupId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAllSubscribersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create or update a subscriber", async () => {
        const randomInt = getRandomInt();
        const params: CreateOrUpdateParams = {
            email: `test${randomInt}@nodejs.com`,
            status:	'active'
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

    it("Assign subscriber to a group", async () => {
        try {
            const response = await mailerlite.groups.assignSubscriber(createdSubscriberId, createdGroupId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleGroupResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Unassign subscriber from a group", async () => {
        try {
            const response = await mailerlite.groups.unAssignSubscriber(createdSubscriberId, createdGroupId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
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

    it("Delete a group", async () => {
        try {
            const response = await mailerlite.groups.delete(createdGroupId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
        } catch (error) {
            handleCatchedError(error);
        }
    });

});