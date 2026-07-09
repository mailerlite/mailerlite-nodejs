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
