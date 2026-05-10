Add an integration test to verify the complete CRUD lifecycle for the backend API.

Please follow these instructions:

1. **Create Integration Test File**: Create `backend/tests/todo.integration.test.ts` with the following implementation:

2. **Update package.json Scripts**: Add separate scripts in `backend/package.json` to run the tests:
   - `"test": "jest"` (to run all tests)
   - `"test:unit": "jest tests/todo.test.ts"` (to run only unit tests)
   - `"test:integration": "jest tests/todo.integration.test.ts"` (to run only integration tests)

3. **Update README.md**: 
   - Update the backend testing section to show instructions for running `npm run test:unit`, `npm run test:integration`, and `npm run test` along with the coverage command.

**Important Notes:**
- Ensure the integration test flow acts sequentially (using the state established from previous test blocks).
- Validate that all new scripts execute successfully without leaving open handles.
