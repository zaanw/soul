# SØUL AI — OpenRouter server branch

This branch builds on the original SØUL UI, with a server-side OpenRouter streaming API.

## Local setup (Windows 11)

1. Install Node.js 22.
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local`.
4. Set `OPENROUTER_API_KEY` and an exact `OPENROUTER_MODEL` ID from https://openrouter.ai/models.
5. Run `npm run dev:ai` and open http://127.0.0.1:3000.

The key is server-only and must never be committed. Do not deploy this branch to GitHub Pages: static Pages hosting cannot run Next.js API routes. Deploy to a Node.js server with authentication and request rate limits before allowing public use.

Chats and manually entered memory are currently saved in this browser's localStorage, not synced between devices. The app forwards enabled memory rules to the model. OpenRouter charges may apply depending on model.

## Checks
```bash
npm ci
npm run lint
npm run build
```

The OpenRouter integration has not yet been verified with a live API key. Check streaming, errors, cancellation, regeneration, and persistence locally before merging.
