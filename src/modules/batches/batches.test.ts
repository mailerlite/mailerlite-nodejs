import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {BatchParams, BatchResponses} from "./batches.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Batches", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    it.concurrent("Make multiple request to api in a single call", async () => {

        const params: BatchParams = {
            requests: [
                {
                    method: "POST",
                    path:   "api/fields",
                    body:   {
                        name: "test batch field 1",
                        type: "text"
                    }
                },
                {
                    method: "POST",
                    path:   "api/fields",
                    body:   {
                        name: "test batch field 2",
                        type: "text"
                    }
                },
                {
                    method: "GET",
                    path:   "/api/forms/popup",
                    body:   {
                        filter: {
                            name: "nodejs"
                        }
                    }
                }
            ]
        }

        try {
            const response = await mailerlite.batches.send(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<BatchResponses>();
        } catch (error) {
            handleCatchedError(error);
        }
    });
});

