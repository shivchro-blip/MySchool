# Data Map (Internal)

Every service that stores or processes user data. Keep this up to date.

## Live services

| Service | Type | Data stored | Region | DPA / terms |
|---------|------|-------------|--------|-------------|
| Supabase | Database + Auth | Email, hashed password, answers, usage logs, consent timestamps | US (AWS) | Supabase Terms of Service |
| Ollama (self-hosted) | AI inference | Practice answer text (processed in-memory, not persisted) | Local server | N/A — self-hosted |

## Planned / conditional services

| Service | Status | Data involved | Notes |
|---------|--------|--------------|-------|
| OpenRouter | Fallback (paid users only) | Practice answer text | Review OpenRouter's privacy policy before enabling for minors |
| ChromaDB | Local vector DB | Anonymised text chunks from textbooks | No user data; content only |

## Not in use

- No analytics SaaS (e.g., Mixpanel, Amplitude) as of 2026-05-11
- No email marketing service
- No advertising networks

## Update this file when:

- Adding any new third-party service
- Changing database hosting provider
- Enabling any analytics SDK
