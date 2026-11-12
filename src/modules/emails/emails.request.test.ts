import { describe, it, expect, vi } from "vitest";

// Type-level test: vitest does not check types, so `npm test` first runs `npm run typecheck:tests` (tsc on this file).
const rejected = { message: "Some attributes were rejected.", keys: ["editor_content.attrs.onclick"] };
const axiosMock = vi.hoisted(() => vi.fn());
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient } from "../../utils/request-mock";

const mailerlite = mockClient();
const block = { id: "2", type: "paragraph", editor_content: {}, placement: { after: null, before: null } };

describe("Emails block writes", () => {
    it("Create a block returns the rejected attributes", async () => {
        axiosMock.mockResolvedValueOnce({ status: 201, data: { data: block, etag: "2", rejected } });

        const response = await mailerlite.emails.createBlock("1", { etag: "1", type: "paragraph", editor_content: {} });

        expect(response.data.rejected?.keys).toEqual(["editor_content.attrs.onclick"]);
        expect(response.data.rejected?.message).toBe("Some attributes were rejected.");
    });

    it("Update a block returns the rejected attributes", async () => {
        axiosMock.mockResolvedValueOnce({ status: 200, data: { data: block, etag: "3", rejected } });

        const response = await mailerlite.emails.updateBlock("1", "2", { etag: "2", editor_content: {} });

        expect(response.data.rejected?.keys).toEqual(["editor_content.attrs.onclick"]);
    });

    it("Find and move a block do not return rejected attributes", async () => {
        axiosMock.mockResolvedValue({ status: 200, data: { data: block, etag: "3" } });

        const found = await mailerlite.emails.findBlock("1", "2");
        const moved = await mailerlite.emails.moveBlock("1", "2", { etag: "3", placement: { position: "start" } });

        // @ts-expect-error find does not return rejected
        expect(found.data.rejected).toBeUndefined();
        // @ts-expect-error move does not return rejected
        expect(moved.data.rejected).toBeUndefined();
    });
});
