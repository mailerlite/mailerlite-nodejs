import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListCategoriesResponse,
    SingleCategoryResponse
} from "./categories.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce categories", () => {

    let shopId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: "Test shop nodejs categories",
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    let categoryId: string;

    it("Create a category", async () => {
        try {
            const response = await mailerlite.ecommerce.categories.create(shopId, { name: "Test category nodejs categories" });

            expect(response).not.toBeNull();
            expect(response.data.data.id).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCategoryResponse>()

            categoryId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get categories", async () => {
        try {
            const response = await mailerlite.ecommerce.categories.get(shopId, { limit: 10 });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListCategoriesResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a category", async () => {
        try {
            const response = await mailerlite.ecommerce.categories.find(shopId, categoryId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCategoryResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a category", async () => {
        try {
            const response = await mailerlite.ecommerce.categories.update(shopId, categoryId, { name: "Test category nodejs updated categories" });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCategoryResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a category", async () => {
        try {
            const response = await mailerlite.ecommerce.categories.delete(shopId, categoryId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCategoryResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
