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

    const urlFor = async (params: object) => {
        await request("/api/files", { method: "GET", params }, config);
        return (axiosMock.mock.calls[0][0] as { url: string }).url;
    };

    // Regression: `undefined` was sent as the literal `filter[type]=undefined`
    // (API returns 422), and `null` threw "Cannot convert undefined or null
    // to object" before the request was made.
    it("omits undefined and null values", async () => {
        expect(await urlFor({ limit: 10, cursor: undefined, filter: { type: null } }))
            .toBe("https://connect.mailerlite.com/api/files?limit=10");
    });

    it("omits the query string when every value is unset", async () => {
        expect(await urlFor({ filter: { type: undefined } }))
            .toBe("https://connect.mailerlite.com/api/files");
    });

    it("keeps falsy but set values", async () => {
        expect(await urlFor({ limit: 0, filter: { name: "" } }))
            .toBe("https://connect.mailerlite.com/api/files?limit=0&filter[name]=");
    });

    it("serializes nested filters and arrays", async () => {
        expect(await urlFor({ filter: { name: "a b", ids: ["1", "2"] } }))
            .toBe("https://connect.mailerlite.com/api/files?filter[name]=a%20b&filter[ids][]=1&filter[ids][]=2");
    });
});
