# Architecture

This document provides an overview of how C-Insight is put together.

## High Level Flow

1. The **CodeInputForm** component collects C code and a target function.
2. The `handleGenerateTests` server action validates input with Zod and calls the `generateUnitTests` flow.
3. The Genkit flow uses Google's Gemini model to produce unit tests, mocks, and stubs.
4. The **TestResults** component displays the generated artifacts or any errors.

## Directory Layout

- `src/app` – App router entry points, server actions, and global styles.
- `src/components` – React components including forms and result tabs.
- `src/ai` – Genkit configuration (`genkit.ts`) and flows (`flows/generate-unit-tests.ts`).
- `src/hooks` – Custom React hooks such as `use-toast`.
- `src/lib` – Utility functions.

## Technology Stack

- **Next.js 15** with the App Router and server actions.
- **Tailwind CSS** and **Radix UI** for styling and components.
- **Genkit** with the Google AI plugin targeting the `googleai/gemini-2.5-flash` model.
- **Firebase App Hosting** configuration via `apphosting.yaml`.

## Future Work

Refer to `docs/blueprint.md` for the project roadmap, including call-graph parsing, coverage metrics, and CI integration.
