import talkback from "talkback";
import {Req} from "talkback/types";
import Tape from "talkback/tape";
import path from "path";


// Start talkback server before all tests
export async function setup() {
    const opts = {
        host: "https://connect.mailerlite.com",
        record: talkback.Options.RecordMode.DISABLED, // to record new tapes change to RecordMode.NEW or RecordMode.OVERWRITE and comment out fallbackMode
        fallbackMode: talkback.Options.FallbackMode.NOT_FOUND,
        name: "MailerLite",
        port: 9090,
        path: "./tapes",
        allowHeaders: [], // all headers are identical, do not save or match by them
        ignoreBody: true,
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
