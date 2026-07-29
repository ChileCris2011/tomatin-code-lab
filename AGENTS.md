# Agent guidance

Work in small, reviewable changes. Before modifying authentication, authorization, submissions, XP, or repository provisioning, inspect the relevant Supabase migration, RLS policy, and tests.

Never commit `.env` files, real Supabase keys, GitHub tokens, student code, or private grading assets. Use `.env.example` with placeholders only.

Validation commands:

```sh
pnpm check
pnpm test:e2e
```

Run end-to-end tests when a user-facing flow changes; otherwise state clearly which focused checks were run.
