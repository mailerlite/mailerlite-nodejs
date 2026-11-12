# CLAUDE.md

MailerLite Node.js SDK (`@mailerlite/mailerlite-nodejs`) — TypeScript wrapper over the MailerLite API (`https://connect.mailerlite.com`).

## Commands

- `npm run build` — tsup → `dist/` (CJS `index.js` + ESM `index.mjs` + `.d.ts` + source maps, minified, target node16)
- `npm run test` — vitest, replays recorded HTTP tapes
- `npm run test:watch`

## Structure

- `src/index.ts` — `MailerLite` class; instantiates every module with a shared `Config` and re-exports all types.
- `src/modules/<name>/` — one folder per API resource:
  - `<name>.module.ts` — class implementing `<Name>Interface`; each method calls `request()` and returns `Promise<AxiosResponse<T>>`
  - `<name>.types.ts` — params/response types + the interface
  - `<name>.test.ts` — tests
  - `README.md` — usage docs per endpoint
- `src/utils/fetch.ts` — single axios `request()`: auth header, nested query serialization (`filter[x]=`), adapters `["http","xhr","fetch"]` for edge runtimes. `data` must stay `undefined` (not `null`) for bodiless requests — Cloudflare Workers rejects it otherwise.
- `src/utils/helpers.ts` — `validateId` (IDs are strings; numbers rejected because IDs exceed `MAX_SAFE_INTEGER`), `pathSegment` (validates and URL-encodes an ID), test helpers.
- `examples/` — manual-testing scripts importing from `../../dist/index.mjs`.

## Conventions

- Relative imports use `.js` extension (`'../../utils/fetch.js'`).
- IDs in a URL go through `pathSegment(id)` (`/shops/${pathSegment(shop_id)}`), which validates and escapes them so an ID can't point the request at another endpoint. Use `validateId()` only for IDs that don't go in the path.
- Each method has a JSDoc block with `@description` and `@see` linking to developers.mailerlite.com.
- Adding a module: create the 4 files above, wire it into `src/index.ts` (property, constructor, `export *`), add a section to the root README.

## Testing

- E-commerce tests and `*.request.test.ts` files mock axios (`src/utils/request-mock.ts`) and assert method/path/query/body; write new tests this way, not as tapes.
- The axios mock returns `{ data: {} }`, so it never checks response types. Each e-commerce test file therefore also holds one documented response sample per object, assigned to the response type (`const sample: ListProductsResponse = {...}`). `npm run typecheck` (`tsconfig.test.json`, run by `npm test`) fails when a type drifts from the sample.
- Older module tests run against a talkback proxy on `localhost:9090` (`src/utils/setup-teardown-hooks.ts`), replaying tapes from `tapes/`. Unrecorded requests return 404.
- Env: `API_KEY` (required even in replay), `VERIFIED_EMAIL` (campaign tests). Never read `.env` — ask the user to provide the credentials.

### Recording new tapes

Only add tapes for new requests — don't `rm -rf tapes`. In `NEW` mode, requests with a matching tape are replayed; only unmatched ones hit the real API and get recorded. New tapes are named by timestamp, so existing ones are never overwritten.

1. `API_KEY` must belong to the production account (ask the user to put it in `.env`).
2. In `setup-teardown-hooks.ts`: set `record: talkback.Options.RecordMode.NEW` and comment out `fallbackMode`.
3. Run only the affected tests, e.g. `npx vitest run src/modules/<name>` (hits the real API).
4. Revert step 2.
5. Review `git status tapes/` before committing:
   - keep only tapes for the new endpoints;
   - every new tape must have a 2xx status — calls answered from old tapes (e.g. `campaigns.get`, `subscribers.createOrUpdate`) can hand new requests IDs that no longer exist, recording a 404;
   - no `Authorization` header, tokens, real emails or personal names.
6. `npm run test` in replay mode must pass.

## Release

1. `npm run build`
2. Record new tapes if needed
3. `npm run test`
4. `npm version patch|minor|major` (creates the commit + tag) → push
5. Create a GitHub Release for the tag → `NPM Publish` workflow (`.github/workflows/publish.yaml`) publishes to npm.
