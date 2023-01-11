import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../MailerLite';
import {ListAllResponse} from "./timezones.types";
import {handleCatchedError} from "../helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
});

describe("Timezones", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    it.concurrent("List all timezones", async () => {
        try {
            const response = await mailerlite.timezones.get();

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAllResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });
});

