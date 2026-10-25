# Playwright Demo Framework

A small, public Playwright (JavaScript) framework that shows how I structure test automation. It runs against two public practice targets, so it contains no client or employer code.

- **UI tests:** [Sauce Demo](https://www.saucedemo.com), a public demo shop
- **API tests:** [JSONPlaceholder](https://jsonplaceholder.typicode.com), a public fake REST API

## What it demonstrates

| Practice | Where |
|---|---|
| Page Object Model | `pages/` |
| Fixtures for page objects and a logged-in state | `fixtures/index.js` |
| Test data kept separate from tests | `data/users.js` |
| UI tests: login, inventory sorting, cart, checkout (positive and negative paths) | `tests/ui/` |
| API tests: status codes, response shape, filtering, create, not found | `tests/api/` |
| Parallel execution, isolated contexts | `fullyParallel` in `playwright.config.js` |
| Retries, trace, screenshot and video on failure | `playwright.config.js` |
| HTML report | `npm run report` |
| CI on every push and pull request | `.github/workflows/playwright.yml` |

## Run it

```bash
npm install
npx playwright install chromium
npm test              # everything
npm run test:ui       # UI only
npm run test:api      # API only
npm run report        # open the HTML report
```

## Design notes

- Locators use `data-test` attributes through `getByTestId` (configured with `testIdAttribute`), which survive style and layout changes better than CSS selectors.
- Every test starts from a clean browser context and does not depend on another test, so order and parallelism do not matter.
- Specs describe behaviour. Selectors and click sequences live in page objects.
- Public demo sites can change or go down. If a test fails with no code change, check the site first.

## Status

18 tests (14 UI, 4 API). All passing locally, including 3 consecutive repeat runs.
