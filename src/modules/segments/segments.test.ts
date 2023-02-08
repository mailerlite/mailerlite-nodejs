import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    GetParams,
    ListAllResponse,
    ListAllSubscribers,
    GetSubscribersParams
} from "./segments.types";

import {handleCatchedError} from "../helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
});

describe("Segments", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    let segmentId: string;

    it.concurrent("List all segments", async () => {
        const params: GetParams = {
            limit: 25,
            page: 1
        }

        try {
            const response = await mailerlite.segments.get(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAllResponse>();

            if (response.data.data.length) segmentId = response.data.data[0].id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get subscribers belonging to a segment", async () => {
        if (!segmentId) {
            throw 'No segments found';
        }

        const params: GetSubscribersParams = {
            filter: {
                status: "active",
            },
            limit: 3
        }

        try {
            const response = await mailerlite.segments.getSubscribers(segmentId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAllSubscribers>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

});

