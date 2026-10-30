import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {BrandStylesResponse} from "./brand-styles.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Brand styles", () => {

    it.concurrent("Get brand styles", async () => {
        try {
            const response = await mailerlite.brandStyles.get();

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data).toHaveProperty("brand");
            expect(response.data.data.default).toBeDefined();
            expect(typeof response.data.data.default.identifier).toBe("string");
            expect(Array.isArray(response.data.data.presets)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<BrandStylesResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
