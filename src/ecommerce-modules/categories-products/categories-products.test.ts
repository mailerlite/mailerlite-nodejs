import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListCategoryProductsResponse,
    CategoryProductResponse
} from "./categories-products.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce categories products", () => {

    let shopId: string;
    let productId: string;
    let categoryId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: "Test shop nodejs categories-products",
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;

        const product = await mailerlite.ecommerce.products.create(shopId, {
            name: "Test product nodejs categories-products",
            price: 19.99
        });
        productId = product.data.data.id;

        const category = await mailerlite.ecommerce.categories.create(shopId, { name: "Test category nodejs categories-products" });
        categoryId = category.data.data.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    it("Assign a product to a category", async () => {
        try {
            const response = await mailerlite.ecommerce.categoriesProducts.assignProduct(shopId, categoryId, productId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<CategoryProductResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get the products of a category", async () => {
        try {
            const response = await mailerlite.ecommerce.categoriesProducts.getProducts(shopId, categoryId, { limit: 10 });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListCategoryProductsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Assign multiple categories to a product", async () => {
        try {
            const response = await mailerlite.ecommerce.categoriesProducts.assignCategories(shopId, productId, { categories: [categoryId], replace: true });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<CategoryProductResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Unassign a product from a category", async () => {
        try {
            const response = await mailerlite.ecommerce.categoriesProducts.unassignProduct(shopId, categoryId, productId);

            expect(response).not.toBeNull();
            expect(response.status).toBe(204);
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
