import { describe, it, expect, vi, beforeEach } from "vitest";

// `vi.mock` is hoisted to the top of the file, so the mock fn has to be
// created with `vi.hoisted` to be available inside the factory.
const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import request from "./fetch";
import { Config } from "./types";

const config: Config = {
    api_key: "test-key",
    basePath: "https://connect.mailerlite.com",
};

describe("request adapter selection", () => {
    beforeEach(() => {
        axiosMock.mockClear();
    });

    it("asks axios to fall back through http -> xhr -> fetch", async () => {
        await request("/api/subscribers", { method: "GET" }, config);

        expect(axiosMock).toHaveBeenCalledTimes(1);
        const passedConfig = axiosMock.mock.calls[0][0] as { adapter: unknown };
        // Ordering matters: Node/browser keep their existing adapter, while
        // edge/serverless runtimes fall back to `fetch`. See issue #31.
        expect(passedConfig.adapter).toEqual(["http", "xhr", "fetch"]);
    });
});

describe("request body handling", () => {
    beforeEach(() => {
        axiosMock.mockClear();
    });

    // Regression: `data: body && JSON.stringify(body)` yielded `null` on
    // bodyless calls. Node's http adapter ignores that, but workerd throws
    // "Request with a GET or HEAD method cannot have a body", breaking every
    // read call on Cloudflare Workers once the fetch adapter is in play.
    it("omits `data` entirely when there is no body", async () => {
        await request("/api/subscribers", { method: "GET" }, config);

        const passedConfig = axiosMock.mock.calls[0][0] as { data: unknown };
        expect(passedConfig.data).toBeUndefined();
        expect(passedConfig.data).not.toBeNull();
    });

    it("still serializes a body when one is given", async () => {
        await request(
            "/api/subscribers",
            { method: "POST", body: { email: "test@example.com" } },
            config
        );

        const passedConfig = axiosMock.mock.calls[0][0] as { data: unknown };
        expect(passedConfig.data).toBe('{"email":"test@example.com"}');
    });
});

describe("request query serialization", () => {
    beforeEach(() => {
        axiosMock.mockClear();
    });

    const queryOf = async (params: object) => {
        await request("/api/subscribers", { method: "GET", params }, config);
        const passedConfig = axiosMock.mock.calls[0][0] as { url: string };
        return passedConfig.url.split("?")[1];
    };

    it("sends booleans as 1 and 0", async () => {
        expect(await queryOf({ with_fields: true, with_groups: false, filter: { enabled: true } })).toBe("with_fields=1&with_groups=0&filter[enabled]=1");
    });

    it("sends dates as the caller's local YYYY-MM-DD", async () => {
        expect(await queryOf({ filter: { date_from: new Date(2026, 2, 4), date_to: new Date(2026, 11, 31, 23, 59) } })).toBe("filter[date_from]=2026-03-04&filter[date_to]=2026-12-31");
    });

    it("skips undefined and null values", async () => {
        expect(await queryOf({ limit: 1, cursor: undefined, sort: null })).toBe("limit=1");
    });

    it("comma-joins list values inside filter", async () => {
        expect(await queryOf({ filter: { id: ["1", "2"] } })).toBe("filter[id]=1%2C2");
    });

    it("keeps the caller's key order", async () => {
        expect(await queryOf({ filter: { form: "9", status: "active" }, sort: "signup_date" })).toBe("filter[form]=9&filter[status]=active&sort=signup_date");
    });
});
