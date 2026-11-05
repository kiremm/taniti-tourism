# Taniti Tourism — Interactive Visitor Guide

Educational WGU UX / Software Engineering prototype for a fictional island. **Work in progress; not a production service or a verified AWS deployment.**

## Current source

- Angular 21 application with an SVG conceptual island map.
- TypeScript zoom, pan and reset handlers.
- Visible navigation, category, search, passport and menu affordances. Some controls are placeholders, not complete visitor workflows.
- No claim of real business locations, live transportation, prices or routes.

## Try locally

```sh
git clone https://github.com/kiremm/taniti-tourism.git
cd taniti-tourism
npm ci
npm start
```

Run `npm run build` and `npm test` to check the build and tests. **Passing tests have not been verified.** The existing starter test still expects the heading `Hello, taniti-tourism`, while the current UI uses `TANITI`; it should be updated before claiming test coverage.

## Cloud engineering learning plan (not completed)

1. Verify local build, required UX interactions and mobile behavior.
2. Add reviewed GitHub Actions build/test checks; document one failed workflow and its correction.
3. Compare GitHub Pages, AWS Amplify, and private S3 with CloudFront OAC for hosting/cost/security.
4. If safe and justified, deploy a demo and verify HTTPS, assets and routing. AWS hosting is optional, not mandatory.
5. Investigate one controlled failure; document logs, cause, recovery and prevention.
6. Publish an accurate architecture, deployment README and case study identifying human work, AI assistance, tests and limitations.

Do not assume infrastructure templates prove a real AWS deployment. Do not provision billable AWS resources before verifying current pricing, account eligibility, MFA, least privilege, alerts and teardown.

## Scope

Complete the existing WGU visitor requirements before expanding infrastructure. Avoid unnecessary accounts, backends, GPS, QR systems or fictional claims about real-world services.

References: [Angular deployment](https://angular.dev/tools/cli/deployment) · [GitHub Actions](https://docs.github.com/en/actions) · [CloudFront OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
