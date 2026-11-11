# AI LAB — Personal AI Learning Workspace

A dark, project-based learning website built for short daily sessions. The first release includes a sequential Week 1 course, daily video/reading links, mini exercises, reflection capture, project milestones, local progress saving, optional Supabase cloud sync, and an optional AI tutor endpoint.

## First release
- 16-week roadmap, with only Week 1 currently authored in detail.
- Five bite-sized Week 1 lessons with resources, questions and linked project tasks.
- Next-day unlocking: complete the exercise, learning checks and reflection to unlock the next lesson.
- Progress and project notes saved in the browser automatically.
- Export progress to JSON.
- Optional Supabase Auth + RLS database sync across devices.
- Optional ChatGPT handoff with lesson context.
- Optional secure AI tutor through a Cloudflare Worker.

## Publish with GitHub Pages
The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. It deploys the site whenever code is pushed to `main`.

1. Open this repository's **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. The workflow will publish the website after a push to `main`.
4. The expected URL is `https://shrutzzzxx.github.io/ai-lab/`.

## Persistent progress: browser and cloud
Progress is saved in browser localStorage by default. This persists across refreshes in the same browser, but does not sync to another browser/device.

To enable cross-device sync:
1. Create a project at https://supabase.com.
2. Open its SQL Editor and run `supabase-schema.sql`.
3. In Supabase Authentication URL settings, allow `https://shrutzzzxx.github.io/ai-lab/`.
4. In AI LAB, open **Settings & sync**, enter the Supabase project URL and anon/publishable key, then request the email sign-in link.
5. Return to the site using that sign-in link. Progress changes sync to the signed-in user's row.

The anon/publishable key is intended for browser use only when row-level security is enabled. Never put a Supabase service-role key in this repository.

## Enable the in-site AI tutor
The ChatGPT handoff works without this setup. To enable direct answers inside AI LAB:
1. Create a Cloudflare Worker.
2. Paste the contents of `worker.js` into it.
3. Add an encrypted Worker secret named `OPENAI_API_KEY`.
4. Optionally set `ALLOWED_ORIGIN` to `https://shrutzzzxx.github.io` and `OPENAI_MODEL` to a model available to your API account.
5. Deploy the Worker and save its URL in AI LAB → Settings & sync → Tutor endpoint.

The API key remains server-side. OpenAI API usage is billed separately from a ChatGPT subscription.

## Local development
Open the repository folder in VS Code and run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Roadmap
The 16-week outline spans ML foundations, evaluation, deep learning, transformers, LLMs, RAG, agents, AI safety, red teaming, interpretability and a research-oriented capstone. Future modules are deliberately placeholders; their daily lessons will be built as you finish each module so the course stays manageable.

## Data and privacy
- Local progress stays in the browser unless Supabase is configured.
- Cloud progress is stored in your Supabase project and protected with row-level security.
- Questions sent to the in-site AI tutor go through your configured Worker and OpenAI API.
- Never add private API keys to GitHub files.
