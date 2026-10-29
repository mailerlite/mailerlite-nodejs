---
name: sdk-module-patterns
description: The structural and code patterns every endpoint and module in this SDK must follow. Use when adding or changing an API endpoint, a method, a module or an endpoint group (e.g. a new docs section like /ecommerce), and when reviewing a PR that does — to check it follows the existing patterns.
---

# SDK module patterns

This SDK mirrors the official API docs (developers.mailerlite.com) one-to-one, and every module looks the same. Treat every rule below as required unless the change explains why it deviates.

Before writing code, open one existing module end to end (`src/modules/groups/` is a good reference) and copy its shape. When the rules here and the code disagree, the code on `main` wins. Say so, and update this skill.

## 1. Where code goes: follow the API docs hierarchy

The folder layout follows the page structure of the official API docs at https://developers.mailerlite.com, not the request paths of the endpoints.

| API docs page | SDK folder |
|---|---|
| `https://developers.mailerlite.com/api/<subgroup>` (e.g. `…/api/groups`) | `src/modules/<subgroup>/` |
| Another top-level section of the API docs, e.g. `https://developers.mailerlite.com/ecommerce/<subgroup>` | `src/<section>-modules/<subgroup>/`, e.g. `src/ecommerce-modules/shops/` |

- One API docs subgroup is one module folder. Never put several subgroups in one file or one class; that file would grow with every new endpoint.
- Folders stay at the same depth as `src/modules/<name>/`, so relative imports remain `'../../utils/fetch.js'`.
- A top-level docs section gets an `index.ts` in its directory that wires its subgroup modules into one entry point (e.g. `mailerlite.ecommerce.shops`). This is the only accepted nesting.
- A new endpoint goes into the module for the API docs page that documents it. If it's documented under `https://developers.mailerlite.com/ecommerce/...`, it does not belong on `campaigns`, `subscribers` or `automations`, even when its request path starts with `/api/campaigns/...`. If you can't find which docs page covers it, ask.

## 2. Every module has exactly these files

```
src/modules/<name>/
├── <name>.module.ts   # one class, flat methods
├── <name>.types.ts    # <Name>Interface + params/response types
├── <name>.test.ts     # talkback tape tests
└── README.md          # one section per method
```

Plus, outside the folder:
- `src/index.ts`: import the class and the interface, add the public property, instantiate it in the constructor, and add `export * from "./modules/<name>/<name>.types.js"`.
- Root `README.md`: a module entry plus one bullet per method, linking to the README anchors.
- `examples/<name>/<method>.js`: one file per method.
- `tapes/<name>/`: recorded tapes.

Adding a method to an existing module touches the same set: module, types, test, module README, root README bullet, example, tape.

## 3. `<name>.module.ts`

```ts
import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type { GroupsInterface, CreateUpdateGroupParams, SingleGroupResponse } from './groups.types.js';

export default class Group implements GroupsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Update a group
     *
     * @see https://developers.mailerlite.com/docs/groups.html#update-a-group
     *
     * @group_id {String} - Group ID
     * @requestBody {Object} - Group data for update
     */
    public update(group_id: string, requestBody: CreateUpdateGroupParams): Promise<AxiosResponse<SingleGroupResponse, CreateUpdateGroupParams>> {

        validateId(group_id);

        return request(`/api/groups/${group_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }
};
```

Rules:
- **One class per file, flat methods.** No sub-resource classes, and no `constructor(private config: Config)` shorthand; declare the field explicitly.
- **Class name is singular** (`Group`, `Field`, `Webhook`). If singular would shadow a global (e.g. `File`), use the plural and add a one-line comment saying why.
- **`import type`** for the types file, and **`.js` extensions** on every relative import.
- **IDs are `string`**, and every ID argument goes through `validateId()` first, one call per ID, followed by a blank line. IDs exceed `MAX_SAFE_INTEGER`, so `number` is never allowed, not even as `string | number`.
- **Method names:** `get` (list), `find` (single), `create`, `update`, `delete`, and verb + sub-resource for the rest (`getSubscribers`, `assignSubscriber`, `findBlock`). Body arguments are named `requestBody`; query arguments are named `params`.
- **Write methods** type both generics: `AxiosResponse<Resp, ReqBody>`. A `delete` that returns nothing is `AxiosResponse<null>`.
- **JSDoc on every method:** `@description`, then `@see` with a deep link (`https://developers.mailerlite.com/docs/<page>.html#<anchor>`), then one tag per argument (`@group_id {String} - …`, `@requestBody {Object} - …`, `@params {Object} - …`).
  - If the endpoint isn't published yet, replace the `@see` line with exactly `TODO: add @see link once developers.mailerlite.com publishes these endpoints`, without a `//` prefix.
- **All HTTP goes through `request()`** in `src/utils/fetch.ts`. Never call axios directly, and never pass `data: null`.
- **Module-local helpers** are fine when only that module needs them. Add a comment saying the helper is deliberately local and should move to `src/utils/` once another module needs it.

## 4. `<name>.types.ts`

- Start with `export interface <Name>Interface { … }`, with columns aligned, mirroring the class signatures exactly.
- **Every response has a named type**: `List<Name>Response`, `Single<Name>Response`, `<Name>Object`. No bare `Promise<AxiosResponse>`, no `Record<string, unknown>` for API objects, and no generic `ListResponse<T>` / `SingleResponse<T>`.
  - `Record<string, unknown>` is only acceptable for genuinely free-form data such as custom subscriber fields.
- **Params are named** `Get<Name>Params`, `Create<Name>Params`, `Update<Name>Params`, or `CreateUpdate<Name>Params` when both use the same shape.
- **Shared types live in `src/utils/types.ts`**: `Links`, `Meta`, `Stats`, `SubscriberObject`, and the nullable pagination types (`NullableLinks`, `NullableMeta`, `NullableMetaLink`, for list responses where the API returns `null` pagination fields). Never define per-module copies of pagination types, and never import shared types from another module's types file.
- **Prefix type names** that could collide through `index.ts`'s `export *`. Check with `git grep -E "export (interface|type) <Name>\b" -- src`.
- **Enums:** a closed string union for request params. For response fields whose values the API may extend, use `Enum | (string & {})`.

## 5. `<name>.test.ts`

- Tests replay **talkback tapes** through `http://localhost:9090`. Never mock axios or `request()`: tapes are the only thing that checks paths, bodies and response shapes against the real API.
- Use the same setup as the existing tests: `import "dotenv/config"`, `const MAILERLITE_API_KEY = process.env.API_KEY as string`, throw if it's missing, and create `new MailerLite({ api_key, base_path: "http://localhost:9090" })`.
- In each test:
  - wrap the call in `try { … } catch (error) { handleCatchedError(error); }`,
  - assert `response.data` and its shape,
  - finish with `expectTypeOf(response.data).toEqualTypeOf<…Response>()`.
- **Each module's methods are tested in that module's test file.**
- **Tests create their own resources** (with `getRandomInt()` in names) and delete them afterwards. Don't depend on fixed IDs that exist only on the recording account.
- **Record tapes** as described in `CLAUDE.md` → "Recording new tapes". Before committing, check that tapes contain no `Authorization` header, tokens, real email addresses or personal names.

## 6. Docs and examples

- **Module `README.md`:** start with a `# <Module>` title, then one `### <Action>` section per method containing:
  - `[Official Documentation](<deep link>)`, or `<!-- TODO: add link once developers.mailerlite.com publishes these endpoints -->` if unpublished,
  - `---`,
  - a `javascript` block using the `.then / .catch(error => { if (error.response) console.log(error.response.data); })` style.
- A method is documented in **its own module's README**, never only in another module's README.
- **Root `README.md`:** one entry per module, with one bullet per method.
- **`examples/<name>/<method>.js`:**
  - first line `// node examples/<name>/<method>.js <args>`,
  - then `"use strict"`, `dotenv`, and `import MailerLite from '../../dist/index.mjs'`,
  - IDs and options come from `process.argv`,
  - two-space indentation and no tabs.
  - A file may define several payload variants and run only one; `examples/campaigns/create.js` does this.

## 7. Before you finish

- [ ] The module folder matches its docs subgroup; nothing is crammed into another module.
- [ ] All the files from section 2 are added or updated, including the root README, examples and tapes.
- [ ] Every ID is a `string` passed to `validateId()`.
- [ ] Every response is typed by name; shared types come from `src/utils/types.ts`.
- [ ] The interface and class signatures match.
- [ ] `npm run build` passes.
- [ ] `npm run test` passes in replay mode. Ask the user for `API_KEY`; never read `.env`.
- [ ] `npx tsc --noEmit` shows no *new* errors. `main` already has pre-existing axios-typing errors, so compare against it.

## When reviewing a PR against these patterns

- Compare against `main`. Fetch the PR with `git fetch origin pull/<n>/head:pr-<n>` and read files via `git show pr-<n>:<path>`, so you don't switch the user's working tree.
- Report only deviations you've confirmed in the code. For anything that depends on API behaviour (body shapes, status codes, return types), check the official docs first. If you can't verify it, say so instead of asserting it.
- Don't report issues that already exist on `main`, such as `serializeQuery` sending `undefined`/`null` or the existing `tsc` errors, as problems with the PR.
- Separate the findings into: deviations that must change, deliberate deviations the PR explains (fine, but they may need a code comment), and questions for the author.
