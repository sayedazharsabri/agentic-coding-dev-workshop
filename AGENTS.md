# AI Development Rules

## Git Rules

- NEVER run `git commit` unless the user explicitly asks for that specific commit.
- A previous request for commit does not imply permission for future commits.
- NEVER run `git push` unless the user explicitly asks for that specific commit.
- A previous request for auto push with commit does not imply permission for future commits and push.
- A previous request for git push does not imply permission for future git push.
- NEVER run scripts or tools (e.g., npm version, release scripts) that internally trigger commits or pushes without approval.
- Never rewrite git history or use `--force`/`-f` flags without explicit approval.
- Never run destructive commands like `git reset --hard` or `git clean -fd` without confirmation.
- Do not create, delete, merge, or rebase branches without explicit approval.
- Only stage (`git add`) files relevant to the current task.
- Write clear, descriptive, and conventional commit messages when approved to commit.

## Database Rules
- Required confirmation before:
  - Schema change
  - migration
  - drop table
  - drop column
  - drop database
  - destructive updates
- Explain migration impact before generating migration

## Destructive Rules
- Always get confirmation before
  - rm -rf
  - docker prune
  - deleting file


## Architecture Rules
- Follow existing project convention
- Do not introduce new framework or libraries without approval


## Code Rules
- Prefer incremental and small changes
- Add explanatory comments for complex or non-obvious logic
- Remove debugging/console logs before finalizing changes
- NEVER use console.log, console.error, etc. directly. Always use the custom logger file: .\agentic-coding-dev-workshop\backend\src\utils\logger.ts
- Keep code DRY (Don't Repeat Yourself) without premature optimization


# Validation Rule
- Run tests before marking task as complete
- Write tests for new changes.
- Modify tests with changes.
- Run lint and prettier before commit
- Ensure tests cover both expected behaviors (happy paths) and edge/error cases


# Security Rule
- Never expose secrets
- Never modify .env file without permission.
- Sanitize and validate all user inputs to prevent injection attacks
- Never hardcode credentials, API keys, or tokens in the source code


# Behaviour Rule
- When uncertain, ask instead of assuming
- Provide a clear summary of your actions after completing a task
- Highlight any required manual steps to the user