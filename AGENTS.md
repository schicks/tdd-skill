# TDD Skills Repository

This repository contains TDD skills for AI coding agents, along with a playground for practicing them.

## Important: Use Bun in the Playground

The `playground/` folder uses Bun exclusively. Always use `bun` or `bunx` commands there. Never use `npm`, `npx`, `yarn`, or `pnpm`.

## Structure

```
tdd-skill/
├── skills/             # TDD skill definitions
│   └── tdd/
│       └── SKILL.md
└── playground/         # Nx workspace for practicing TDD
    ├── package.json    # Root workspace configuration
    ├── nx.json         # Nx configuration with test caching
    └── packages/       # All packages live here
        └── tennis/     # Example: Tennis kata for TDD practice
            ├── package.json
            ├── tennis.ts       # Source file
            └── tennis.test.ts  # Colocated test file
```

## Running Tests

**Run all tests from the playground:**

```bash
cd playground && bun run test
```

This executes `nx run-many -t test` which runs tests in all packages.

**Run tests for a single package:**

```bash
cd playground && bunx nx test tennis
```

Or directly in the package folder:

```bash
cd playground/packages/tennis && bun test
```

## Adding a New Package

1. Create a new folder in `playground/packages/`:
   ```bash
   mkdir playground/packages/my-kata
   ```

2. Add a `package.json` with a test script:
   ```json
   {
     "name": "my-kata",
     "version": "0.0.0",
     "private": true,
     "scripts": {
       "test": "bun test"
     }
   }
   ```

3. Create source and test files colocated:
   - `my-kata.ts` - source code
   - `my-kata.test.ts` - tests (using `bun:test`)

4. Run `bun install` from the playground folder to register the new workspace package:
   ```bash
   cd playground && bun install
   ```

## Test File Convention

Tests are colocated with source files:
- `foo.ts` contains the implementation
- `foo.test.ts` contains the tests

Bun's test runner automatically discovers `*.test.ts` files.

## Nx Caching

Test results are cached by Nx. If source files haven't changed, tests will use cached results. To force a fresh run:

```bash
cd playground && bunx nx run-many -t test --skip-nx-cache
```
