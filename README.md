# BotsCrew Website Testing Suite

Automated end-to-end tests for the [BotsCrew](https://botscrew.com/) website using Playwright.

## Description

This repository contains a comprehensive suite of automated tests for the BotsCrew website. The tests cover main website components including navigation, interactive chatbot, and UI elements.

## What's Tested

### 1. Navigation Bar
**Visible Links** - Direct links in the navigation menu:
- Platform
- Home
- Our Work

**Hidden Links** - Elements in dropdown menus:
- **Industries**: Healthcare, Customer Service, Digital Agencies
- **Services**: Enterprise AI Solutions, Generative AI, Discovery Phase, Chatbot Reseller
- **Resources**: Chatbot ROI calculator, GPT-4o Prototype Generator, GPT Guide, GPT Newsletter
- **About us**: About us, Contact us, Our Process, Careers

### 2. Chatbot Widget
- Opening the bot panel
- Sending text messages and receiving responses
- Using pre-prepared quick reply buttons
- Closing the bot window (2 methods: X button and minimize)
- Handling empty messages (negative test)

### 3. UI Elements
- Top page banner and its close functionality

## 🛠️ Tech Stack

- **Playwright** - Browser automation framework
- **JavaScript** - Programming language
- **Node.js** - Runtime environment

##  Installation

1. Clone the repository:
```bash
git clone git@github.com:yvhdpdngr276/Test_task.git
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/testsjs.spec.js
```

### Run with UI mode (visual interface)
```bash
npx playwright test --ui
```

### Run in headed mode (with visible browser)
```bash
npx playwright test --headed
```

### Run specific test by name
```bash
npx playwright test -g "test name"
```

### View test report
```bash
npx playwright show-report
```

## 📝 Test Descriptions

### Navigation Bar Tests
Verifies correct navigation menu functionality:
- Navigation through visible links
- Dropdown menu expansion
- Navigation through hidden links
- Verification of correct URLs and page titles

### Bot Functionality Tests
Tests chatbot widget functionality:
- `Bot Panel Testing Overview` - Opening the bot panel
- `Bot Test input_answer` - Sending a text message
- `Bot Test button_answer` - Clicking quick reply button
- `Bot close button 1` - Closing via X button
- `Bot close button 2` - Minimizing the bot window
- `Bot Test void input` - Negative test (empty message) - **expected to fail**

### Banner Tests
Verifies page banner functionality and its close button.

## ⚠️ Known Issues

- The test `Bot Test void input` is intentionally marked as failing (`test.fail`) - this is a negative test that verifies the bot doesn't respond to empty messages

## Bug Reports

If you find a bug on the website, use the template in `.github/ISSUE_TEMPLATE/bug_report.md` to create a detailed report.

## Future Improvements

- [ ] Add mobile device tests
- [ ] Add visual regression tests (screenshot testing)
- [ ] Add performance tests
- [ ] Expand test coverage for website forms
- [ ] Add CI/CD integration

## Authors

yvhdpdngr276

## Useful Links

- [Playwright Documentation](https://playwright.dev/)
- [BotsCrew Website](https://botscrew.com/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

**Last Updated:** September 2025
