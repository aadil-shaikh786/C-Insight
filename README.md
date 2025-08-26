# C-Insight

C-Insight is an experimental web application that uses Google's Genkit and Gemini models to generate unit tests for C functions. The app is built with Next.js 15, Tailwind CSS, and Firebase App Hosting.

## Features

- Upload C code and specify a function to test.
- Server actions validate input and invoke a Genkit flow to produce unit tests, mocks, and stubs.
- UI built with Shadcn components and Radix primitives.
- Project blueprint for future features like call-graph analysis and coverage reports.

## Project Structure

- `src/app` – Next.js app router pages, server actions, and global styles.
- `src/components` – UI components such as `CodeInputForm`, `TestResults`, and `Header`.
- `src/ai` – Genkit configuration and flows (e.g., `generate-unit-tests.ts`).
- `docs/` – Additional documentation (`blueprint.md`, architecture docs).

## Getting Started

1. **Prerequisites**: Node.js 20+ and npm.
2. **Install dependencies**: `npm install`.
3. **Configure environment**: set `GOOGLE_AI_API_KEY` for Gemini access.
4. **Run dev server**: `npm run dev` to start Next.js on port 9002.
5. **Optional**: `npm run genkit:dev` to launch Genkit developer tools.
6. **Build for production**: `npm run build` then `npm start`.

## Scripts

- `npm run dev` – Start Next.js development server.
- `npm run genkit:dev` – Start Genkit development environment.
- `npm run lint` – Run lint checks.
- `npm run typecheck` – Run TypeScript type checks.
- `npm run build` – Compile production bundle.

## Contributing

- Fork and clone the repository.
- Create feature branches; ensure `npm run lint` and `npm run typecheck` pass before submitting pull requests.
- See `docs/architecture.md` and `docs/blueprint.md` for design details and roadmap.

## License

No license has been specified yet.
