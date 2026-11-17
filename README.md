# express

## Running the project

Requirements for each approach: tsx, nodemon, and plain node.

### 1. tsx

- Scripts: `"dev": "tsx watch src/index.ts"`, `"start": "tsx src/index.ts"`
- Requires: `tsx` in devDependencies (or dependencies if used in production).
- Imports: extensionless (`'./app.module'`) work as-is.
- Syntax: any TypeScript syntax (enum, namespace, parameter properties).

### 2. nodemon

- Script: `"dev": "nodemon"`
- Config: `nodemon.json` with `"exec"` set to a runner, e.g. `"node src/index.ts"`.
- Requires: `nodemon` in devDependencies, plus the runner's requirements.
- With `"exec": "node src/index.ts"`:
  - Requires Node 24+ and `"allowImportingTsExtensions": true` in `tsconfig.json` (with `noEmit: true`).
  - Imports must end in `.ts` (`'./app.module.ts'`).
  - Syntax: only erasable TypeScript (no parameter properties, enum, namespace).

### 3. node

- Scripts: `"dev": "node --watch src/index.ts"`, `"start": "node src/index.ts"`
- Requires: Node 24+ and `"allowImportingTsExtensions": true` in `tsconfig.json` (with `noEmit: true`).
- Imports must end in `.ts` (`'./app.module.ts'`).
- Syntax: only erasable TypeScript (no parameter properties, enum, namespace).
