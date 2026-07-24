# Security

## Demo authentication

Tomatin Code Lab is a static GitHub Pages application. Its accounts, progress,
ranking, and admin settings live only in `localStorage` in the current browser.

The published demo credentials are intentionally public:

- student: `demo@tomatin.local` / `tomatin123`
- admin: `admin@tomatin.local` / `mustakis42`

They protect no real data. Never reuse those passwords elsewhere and do not put
personal, private, or sensitive information into this demo.

The registration flow hashes local passwords to avoid storing plain text, but
client-side storage is not an authentication boundary. Anyone who controls the
browser can inspect or modify its data.

## Production deployments

A real multi-user deployment must replace the local auth and data modules with
a server-side identity provider and database, enforce authorization on the
server, rate-limit login attempts, and define retention and privacy policies.

## Reporting a vulnerability

Open a private security advisory in the GitHub repository. Include the affected
version, reproduction steps, impact, and a minimal proof of concept. Do not put
secrets or personal data in a public issue.

