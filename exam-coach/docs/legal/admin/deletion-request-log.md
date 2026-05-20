# Data Deletion Request Log (Internal)

Track all user data deletion requests here. Never publish this file.

| # | Date received | Email | Request type | Date completed | Notes |
|---|---------------|-------|-------------|----------------|-------|
| 1 | YYYY-MM-DD | user@example.com | Account + data deletion | YYYY-MM-DD | |

## Process

1. User emails privacy@tnexamcoach.in with subject "Data deletion request".
2. Log the request here within 24 hours of receipt.
3. Delete from Supabase: auth.users row (cascades to users, responses, usage_logs).
4. Confirm deletion to user by email.
5. Mark "Date completed" above.
6. Target: respond within 30 days of request.
