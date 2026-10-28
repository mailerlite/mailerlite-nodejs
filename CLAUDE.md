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
- `src/utils/helpers.ts` — `validateId` (IDs are strings; numbers rejected because IDs exceed `MAX_SAFE_INTEGER`), test helpers.
- `examples/` — manual-testing scripts importing from `../../dist/index.mjs`.

## Conventions

- Relative imports use `.js` extension (`'../../utils/fetch.js'`).
- Every method that takes an ID calls `validateId()` first.
- Each method has a JSDoc block with `@description` and `@see` linking to developers.mailerlite.com.
- Adding a module: create the 4 files above, wire it into `src/index.ts` (property, constructor, `export *`), add a section to the root README.

## Testing

- Tests run against a talkback proxy on `localhost:9090` (`src/utils/setup-teardown-hooks.ts`), replaying tapes from `tapes/`. Unrecorded requests return 404.
- Env: `API_KEY` (required even in replay), `VERIFIED_EMAIL` (campaign tests). Never read `.env` — ask the user to provide the credentials.
- Coverage: 49/51 endpoints.

### Recording new tapes

In `setup-teardown-hooks.ts`:
1. `rm -rf tapes`
2. Set `record: talkback.Options.RecordMode.NEW`
3. Comment out `fallbackMode`
4. `npm run test` (hits the real API — needs a valid `API_KEY`)
5. Revert steps 2–3 afterwards.

## Release

1. `npm run build`
2. Record new tapes if needed
3. `npm run test`
4. `npm version patch|minor|major` (creates the commit + tag) → push
5. Create a GitHub Release for the tag → `NPM Publish` workflow (`.github/workflows/publish.yaml`) publishes to npm.