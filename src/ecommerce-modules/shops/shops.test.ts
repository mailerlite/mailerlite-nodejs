import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListShopsResponse,
    SingleShopResponse,
    ShopStatsResponse
} from "./shops.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce shops", () => {

    let createdShopId: string;

    it("Create a shop", async () => {
        try {
            const response = await mailerlite.ecommerce.shops.create({ name: "Test shop nodejs shops", url: "https://shop.example.com", currency: "EUR" });

            expect(response).not.toBeNull();
            expect(response.data.data.id).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleShopResponse>()

            createdShopId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("List e-commerce shops", async () => {
        try {
            const response = await mailerlite.ecommerce.shops.get({ limit: 10 });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListShopsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a shop", async () => {
        try {
            const response = await mailerlite.ecommerce.shops.find(createdShopId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleShopResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a shop", async () => {
        try {
            const response = await mailerlite.ecommerce.shops.update(createdShopId, { name: "Test shop nodejs updated shops" });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleShopResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch shop e-commerce stats", async () => {
        try {
            const response = await mailerlite.ecommerce.shops.getStats(createdShopId, { start_date: "2026-10-01", end_date: "2026-10-31" });

            expect(response).not.toBeNull();
            expect(response.data.data.ecommerce).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<ShopStatsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a shop", async () => {
        try {
            const response = await mailerlite.ecommerce.shops.delete(createdShopId);

            expect(response).not.toBeNull();
            expect(response.status).toBe(204);
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
