### Testing generated code
1. `npm run build` in `mailerlite-nodejs` root
2. Each example file has a script in the first line. Run it in the console, pass parameter where needed.

### Testing the package install

1. Run `npm pack` in `mailerlite-nodejs` root. `.tgz` package will be generated
2. `npm run install-mailerlite-nodejs` in `mailerlite-nodejs/examples`
3. To test ECMAScript (ESM) module set `"type": "module"` in `examples/package.json`. Or `"type": "commonjs"` for CommonJS (CJS)
4. Replace imports in the example file

```javascript
// For ECMAScript (ESM)
import dotenv from 'dotenv';
import MailerLite from '@mailerlite/mailerlite-nodejs';
```

```javascript
// For CommonJS (CJS)
const dotenv = require('dotenv');
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;
```
5. After changing the source code make sure to `npm uninstall @mailerlite/mailerlite-nodejs` and start from point 1.
