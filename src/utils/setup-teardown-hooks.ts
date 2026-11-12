import talkback from "talkback";
import {Req} from "talkback/types";
import Tape from "talkback/tape";
import path from "path";
import {isDeepStrictEqual} from "node:util";


// Editor and name (random digits stripped) of a campaign creation body, the parts that tell campaign tapes apart.
function campaignKey(body: Buffer): { editor?: string, name?: string } {
    try {
        const parsed = JSON.parse(body.toString());
        return {
            editor: parsed?.emails?.[0]?.editor,
            name: typeof parsed?.name === "string" ? parsed.name.replace(/\d+/g, "") : undefined,
        };
    } catch {
        return {};
    }
}

// Parsed JSON body, or the raw string when it is empty or not JSON.
function parseBody(body: Buffer): unknown {
    const raw = body?.toString() ?? "";
    try {
        return JSON.parse(raw);
    } catch {
        return raw;
    }
}

// Start talkback server before all tests
export async function setup() {
    const opts = {
        host: "https://connect.mailerlite.com",
        record: talkback.Options.RecordMode.DISABLED, // to record new tapes: 1. rm -rf tapes 2. change to RecordMode.NEW 3. comment out fallbackMode 4. npm run test
        fallbackMode: talkback.Options.FallbackMode.NOT_FOUND,
        name: "MailerLite",
        port: 9090,
        path: "./tapes",
        allowHeaders: [], // all headers are identical, do not save or match by them
        // Bodies are not compared as a whole, see bodyMatcher: it is called for every request whose body differs from the tape's.
        ignoreBody: false,
        bodyMatcher: function bodyMatcher(tape: Tape, req: Req) {
            // Matching is on method and URL, plus a body check in these cases (talkback 4.2 has no `tapeMatcher` option):
            // - POST /api/campaigns: the editor and the name without digits must be equal, so a simple editor campaign
            //   does not replay the default editor tape, and campaigns of different tests do not share one
            //   (random number suffixes in names still match).
            // - /api/emails/*: the JSON bodies must be deep-equal, so requests with the same method + URL but
            //   a different payload get their own tapes.
            // Everything else matches on method + URL only (the body is ignored).
            const pathname = new URL(req.url, "http://localhost").pathname;
            if (req.method === "POST" && pathname === "/api/campaigns") {
                return isDeepStrictEqual(campaignKey(tape.req.body), campaignKey(req.body));
            }
            if (pathname.startsWith("/api/emails/")) {
                return isDeepStrictEqual(parseBody(tape.req.body), parseBody(req.body));
            }
            return true;
        },
        silent: true,
        // debug: true,

        requestDecorator: function requestDecorator(req: Req) {
            delete req.headers['content-length']; // important! API fails if this header is present
            return req;
        },

        tapeNameGenerator: function nameGenerator(tapeNumber: number, tape: Tape) {
            const url = new URL(tape.options.host + tape.req.url);
            let endpointName = url.pathname.replace('/api/', '');
            endpointName = endpointName.split('/')[0];
            return path.join(`${endpointName}`, `test-${tape.req.method}-${tapeNumber}`);
        }
    };

    const server = talkback(opts);
    server.start(() => {console.log("************Talkback Started*****************")})

    return async () => {
        await server.close(() => console.log("************Talkback Stopped*****************"));
    }
}
