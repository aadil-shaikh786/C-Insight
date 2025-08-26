# **App Name**: C-Insight

## Core Features:

- Codebase Parser: Parses a C codebase to extract function call graphs.
- Execution Path Analyzer: Implements DFS and BFS traversal (using NetworkX) to identify execution paths.
- AI Test Generator: Auto-generates unit tests, mocks, and stubs for identified functions using GenAI tool APIs (LangChain + LangGraph + HuggingFace Inference API).
- Unit Test Runner: Uses the PyTest unit testing framework for generated tests validation.
- CI Workflow: Runs the generated tests automatically in a CI workflow.
- Frontend Dashboard: Presents auto-generated unit test results and coverage metrics.
- C Code Upload: Allows users to upload C code, view generated test cases, coverage metrics (from Codecov) and pass/fail results of tests.

## Style Guidelines:

- Primary color: Deep purple (#6750A4), reflecting the depth of code analysis.
- Background color: Light gray (#F2F0FA), provides a soft, unobtrusive backdrop.
- Accent color: Teal (#50A495), highlights actionable elements and important metrics.
- Body and headline font: 'Inter', sans-serif, with a modern, machined, objective, neutral look, and suitability for both headlines and body text.
- Code font: 'Source Code Pro', monospaced, suitable for displaying code snippets.
- Consistent use of grid-based layouts.
- Simple, clear icons.