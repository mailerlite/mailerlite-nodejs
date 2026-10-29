import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    EcommerceSettingsResponse
} from "./settings.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce settings", () => {

    it("Get e-commerce tracking settings", async () => {
        try {
            const response = await mailerlite.ecommerce.settings.get();

            expect(response).not.toBeNull();
            expect(response.data.data.ecommerce_attribution_window).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<EcommerceSettingsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
