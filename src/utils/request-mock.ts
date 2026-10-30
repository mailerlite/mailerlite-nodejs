import { Mock } from "vitest";
import MailerLite from "../index";

export const mockBasePath = "https://connect.mailerlite.com";

export function mockClient(): MailerLite {
    return new MailerLite({ api_key: "test-key", base_path: mockBasePath });
}

export function lastRequest(axiosMock: Mock) {
    const config = axiosMock.mock.calls[axiosMock.mock.calls.length - 1][0] as { method: string; url: string; data?: string };
    const url = config.url.slice(mockBasePath.length);
    const [path, query = ""] = url.split("?");

    return {
        method: config.method,
        path,
        query,
        body: config.data === undefined ? undefined : JSON.parse(config.data),
    };
}
