# Deployment notes

## Removing "Made with Cursor" or tool attribution

If "Made with Cursor" (or similar) appears:

- **On the live website** — This project does not include any Cursor attribution in the code. The root layout sets a neutral `generator` meta tag. If you still see it, check for a Vercel integration or deployment variable that injects a badge and disable it in Vercel → Project → Settings → Integrations.

- **On the Vercel deployment page** — Vercel sometimes shows project source/IDE. In Vercel Dashboard → your project → Settings, review any "Source" or "Build" integrations and remove or unlink Cursor if you don’t want that shown.

- **On GitHub** — Edit the repo’s About section (description, website URL, topics) and remove any "Cursor" topic or description so the repo doesn’t advertise the editor.

No Cursor references are in the app’s UI, footer, or meta tags.

## Commit messages

If your editor adds a “Made-with” or similar trailer to commit messages, it will appear on GitHub. To avoid that:

- Commit from the terminal with a plain message: `git commit -m "Your message"` (single line, no body).
- Or install a local `commit-msg` hook that strips unwanted trailers from `.git/hooks/commit-msg` before pushing.
