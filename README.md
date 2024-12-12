## Clone and go to the
git clone https://github.com/[your-repo]/playwright-eval.git
cd playwright-eval

## Install dependencies
npm init -y
npm install @playwright/test typescript
npx playwright install

## Run and view the HRML report
npx playwright test --reporter=html
npx playwright show-report
