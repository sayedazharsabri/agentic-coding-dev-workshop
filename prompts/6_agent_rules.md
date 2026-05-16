# Create AI Agent Rules (AGENTS.md)

Please create a file named `AGENTS.md` in the root of the project to define the strict rules, constraints, and guidelines that the AI coding assistant must follow while working on this project. 

The file should be structured logically and include the following sections and rules:

## 1. Git Rules
- Never perform auto-commits or auto-pushes.
- Never rewrite git history without explicit user approval.
- Avoid branch resets without permission.
- Always write clear, descriptive, and conventional commit messages.

## 2. Database Rules
- Require explicit confirmation before making:
  - Schema changes
  - Database migrations
  - Table or column drops
  - Database drops
  - Any other destructive updates
- Always explain the impact of a migration before generating or running it.

## 3. Destructive Rules
- Always get user confirmation before executing potentially destructive commands, such as:
  - `rm -rf`
  - `docker prune`
  - Deleting any project files.

## 4. Architecture Rules
- Strictly follow the existing project conventions and design patterns.
- Do not introduce new frameworks, libraries, or major architectural changes without explicit approval.

## 5. Code Rules
- Prefer incremental, small, and focused changes over massive rewrites.
- Add explanatory comments for complex or non-obvious logic.
- Keep the codebase DRY (Don't Repeat Yourself) but avoid premature optimization.
- **Strict Logging Policy**: NEVER use `console.log`, `console.error`, `console.warn`, etc. directly in the codebase. Always use the project's custom logger utility (e.g., `backend/src/utils/logger.ts`).
- Always remove debugging logs before finalizing and committing changes.

## 6. Validation & Testing Rules
- Ensure the project builds successfully and run existing tests before marking a task as complete.
- Write tests for all newly added features or changes.
- Modify tests when existing functionality changes to prevent regressions.
- Run linting and formatting (e.g., Prettier, ESLint) before committing.
- Ensure tests cover expected behaviors (happy paths) as well as edge cases and error handling.

## 7. Security Rules
- Never expose or leak secrets (e.g., passwords, API keys).
- Never modify the `.env` file or environment variables without explicit permission.
- Sanitize and validate all user inputs to prevent injection attacks (SQL injection, XSS, etc.).
- Never hardcode credentials, API keys, or security tokens in the source code.

## 8. Behaviour Rules
- When uncertain or faced with ambiguity, **ask for clarification** instead of making assumptions.
- Provide a clear, concise summary of actions taken after completing a task.
- Explicitly highlight any required manual steps to the user (e.g., setting up new environment variables, running a specific script, deploying).

## 9. Documentation Rules
- Maintain and update the `README.md` and other relevant documentation files as the project evolves.
- Write clear and concise JSDoc/TSDoc comments for exported functions, interfaces, and classes.
