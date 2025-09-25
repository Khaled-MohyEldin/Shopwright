# 🛒 Shopwright

**Playwright Automation Framework in TypeScript** for modern shopping websites. This project delivers comprehensive **UI testing**, **API validation**, and **security checks**, all powered by **data-driven, end-to-end workflows**. Built with scalability and maintainability in mind, Shopwright is fully compatible with **GitHub Actions CI/CD** for seamless automation.

---

## 🚀 Features

- ✅ **UI Testing**: Covers critical user journeys including login, product search, cart operations, and checkout.
- 🔌 **API Validation**: Verifies backend endpoints using Playwright’s request context and custom assertions.
- 🔐 **Security Checks**: Includes token validation, authentication flows, and basic vulnerability probes.
- 📊 **Data-Driven Execution**: External JSON/CSV datasets drive dynamic test scenarios.
- 🧱 **Modular Architecture**: Built using Page Object Model (POM) for clean separation and reusability.
- ⚙️ **CI/CD Ready**: Integrated with GitHub Actions for automated test runs on push, pull requests, and scheduled jobs.

---

## 📁 Project Structure
Shopwright/
├── tests/              # UI and API test cases
├── POM/                # Page Object Models
├── test-data/          # External datasets for data-driven testing
├── utilities/          # Custom helpers and assertions
├── playwright.config.ts
├── package.json


---

## 🧪 Getting Started

```bash
# Install dependencies
npm install

# Run tests
npx playwright test

# View test report
npx playwright show-report

#some Custom Scripts
npm run Full_DataDriven_ETE
npm run Selective_DataDriven_ETE
npm run mockNetwork
npm run API

#allure Reorting is integrated
npm run Full_DataDriven_ETE_allure
allure serve allure-results
```
🔄 GitHub Actions Integration
This project includes a CI workflow that:

Installs dependencies

Runs Playwright tests

Uploads test reports as artifacts

To enable it, ensure your .github/workflows/playwright.yml is configured like this:
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run Playwright tests
        run: npx playwright test
      - name: Upload test report
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/


📌 Future Enhancements
Add visual regression testing

Expand security test coverage

add mobile emulation support




