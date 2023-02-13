import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    FormTypes,
    GetFormsParams,
    ListFormsResponse,
    SingleFormResponse
} from "./forms.types";
import {getRandomInt, handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Forms", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    let formId: string;

    it("List all forms", async () => {
        const formType:FormTypes = "popup";
        const params: GetFormsParams = {
            limit: 25,
            page: 1,
            filter: {
                name: "nodejs"
            },
            sort: "created_at"
        };

        try {
            const response = await mailerlite.forms.get(formType, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListFormsResponse>();

            if (response.data.data.length) formId = response.data.data[0].id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a form", async () => {
        if (!formId) {
            throw 'No forms found with name "nodejs"';
        }

        const randomInt = getRandomInt();
        const params = {
            name: `[Do not delete] nodejs popup ${randomInt}`
        }

        try {
            const response = await mailerlite.forms.update(formId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleFormResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
