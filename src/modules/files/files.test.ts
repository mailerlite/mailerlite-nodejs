import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {GetFilesParams, ListFilesResponse} from "./files.types";
import {handleCatchedError} from "../../utils/helpers";

if (!process.env.API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: process.env.API_KEY as string,
    base_path: "http://localhost:9090",
});

describe("Files", () => {

    it.concurrent("List all files", async () => {
        try {
            const response = await mailerlite.files.get();

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expect(response.data.links).toBeDefined();
            expect(response.data.meta).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<ListFilesResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it.concurrent("List files with params", async () => {
        const params: GetFilesParams = {
            limit: 10,
            page: 1,
            filter: {
                type: "image" // possible types: image, pdf, epub
            },
            sort: "-created_at"
        };

        try {
            const response = await mailerlite.files.get(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expect(response.data.links).toBeDefined();
            expect(response.data.meta).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<ListFilesResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
