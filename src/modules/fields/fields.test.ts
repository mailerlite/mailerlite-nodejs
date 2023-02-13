import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    GetParams,
    ListAllResponse,
    SingleFieldResponse,
    CreateParams,
    UpdateParams
} from "./fields.types";

import {getRandomInt, handleCatchedError} from "../helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Fields", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    let createdFieldId: string;

    it.concurrent("List all fields", async () => {
        const params: GetParams = {
            limit: 5,
            page: 1,
            filter: {
                type: "text", // text, number, date
            },
            sort: "name" // name, -name, type, -type
        }

        try {
            const response = await mailerlite.fields.get(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAllResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a field", async () => {
        const randomInt: number = getRandomInt();
        const params: CreateParams = {
            name: `Test field nodejs ${randomInt}`,
            type: 'text' // text, number, date
        }

        try {
            const response = await mailerlite.fields.create(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleFieldResponse>()
            createdFieldId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a field", async () => {
        const randomInt: number = getRandomInt();
        const params: UpdateParams = {
            name: `Test field nodejs updated ${randomInt}`,
        }

        try {
            const response = await mailerlite.fields.update(createdFieldId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleFieldResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a field", async () => {
        try {
            const response = await mailerlite.fields.delete(createdFieldId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
        } catch (error) {
            handleCatchedError(error);
        }
    });

});

