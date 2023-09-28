import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    GetGroupsParams,
    ListAllGroupsResponse,
    CreateUpdateGroupParams,
    SingleGroupResponse,
    ListAllSubscribersResponse,
    SubscriberParams
} from "./groups.types";
import {getRandomInt, handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Groups", () => {

    let createdGroupId: string;

    it.concurrent("List all groups", async () => {
        const params: GetGroupsParams = {
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
        const params: CreateUpdateGroupParams = {
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
        const params: CreateUpdateGroupParams = {
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
