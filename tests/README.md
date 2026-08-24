# Unit tests

Jest harness for the plain-JavaScript logic in this repository's demo mini-programs.

```
npm install
npm test              # run the suite
npm run test:coverage # run with a coverage report (coverage/)
```

Tests live under `tests/<demo>/` and require the module under test directly from its demo
folder, so the demos themselves stay untouched. Modules that need the WeChat runtime are
covered by stubbing the globals they use (e.g. `getApp` in the redux binding tests).

To cover another module, add its path to `collectCoverageFrom` in `jest.config.js`.
