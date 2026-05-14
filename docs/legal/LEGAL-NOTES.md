# Legal Notes (Internal — Never Display to Users)

This file is for operator notes only. Do not render this file in the app or on the website.

---

## Sync checklist

Whenever you update `privacy-policy.md` or `terms-of-service.md` in this folder:

1. Update `LEGAL_LAST_UPDATED` in `frontend/web/src/lib/legal-constants.js`
2. Update `kLegalLastUpdated` in `frontend/app/lib/config/legal_constants.dart`
3. Copy updated content to `frontend/web/src/legal/` (web render source)
4. Copy updated content to `frontend/app/assets/content/legal/` (mobile render source)
5. Commit all four changes together.

## Content ownership notes

- Syllabus chapters are sourced from TN State Board textbooks (government publications).
  These are displayed for educational purposes. No copyright claim is made over them.
- AI-generated explanations and feedback are generated per-request and not pre-published.
  Copyright status of AI output in India is currently unsettled — avoid asserting strong IP claims.

## Registration status

- Not a registered entity as of 2026-05-11.
- See `admin/FUTURE-LEGAL-TRIGGERS.md` for events that should prompt registration.

## Auth and data handling

- Auth: Supabase Auth (password stored as bcrypt hash, never plain text).
- User data stored in Supabase (PostgreSQL), hosted on Supabase's servers.
- Supabase is US-based. For strict DPDP (India) compliance review: check Supabase's DPA.
- The Digital Personal Data Protection Act 2023 (India DPDP) applies. Key obligations:
  - Collect only what you need (done).
  - Provide notice at collection (done via privacy policy + consent checkbox).
  - Allow deletion on request (done via contact email).
  - Minors require parental consent (done via age confirmation).

## Known TODOs before launch

- [ ] Replace CONTACT_EMAIL placeholder with a real monitored inbox
- [ ] Verify Supabase DPA is in place if you intend to comply with DPDP strictly
- [ ] Add HTTPS to the production deployment
- [ ] Update LEGAL_LAST_UPDATED constant when content is finalised
