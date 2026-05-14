# AI Development Rules

## Git Rules

- Never do auto-commit
- Never do auto-push
- Never rewrite git history without approval
- branch reset

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


# Validation Rule
- Run tests before marking task as complete
- Write tests for new changes.
- Modify tests with changes.
- Run lint and prettier before commit


# Security Rule
- Never expose secrets
- Never modify .env file without permission.


# Behaviour Rule
- When uncertain, ask instead of assuming