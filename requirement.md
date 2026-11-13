import pypandoc

markdown = r"""# FitZelly Backend Refactoring: Modular Monolith + Clean Architecture

## Task

Act as a **Senior Backend Architect and TypeScript/Node.js Engineer**. Audit and refactor my existing FitZelly backend into a maintainable, scalable **Modular Monolith using pragmatic Clean Architecture**.

This is a structural refactoring task, not a rewrite. Preserve working business behavior and existing integrations.

## 1. Current Context

My backend currently has a structure similar to:

```text
src/
├── application/
├── config/
├── constants/
├── domain/
├── infrastructure/
├── main/
├── presentation/
├── cron.ts
├── index.ts
└── worker.ts
```

The current codebase may also organize features around four user roles/portals: gym, client, trainer, and admin. Managing code across global architectural folders and role-based folders has become difficult.

FitZelly is a gym management SaaS application. Its four portals share business capabilities but require different permissions and access rules.

The repository may contain authentication, authorization, gym management, client management, memberships, payments, notifications, background workers, scheduled jobs, and other features. **Discover the actual features, roles, integrations, and responsibilities from the codebase. Do not assume every example in this prompt exists.**

## 2. Mandatory Architectural Direction

Refactor the backend into a **Modular Monolith + Clean Architecture**.

### Core requirements

- Organize the backend primarily by **business capability**, not by user role and not by global technical layers alone.
- Keep Clean Architecture boundaries inside each business module where they provide meaningful value.
- Keep one backend application and deployment unit unless the existing project has a documented reason to do otherwise.
- Preserve the Repository Pattern where it provides a useful abstraction.
- Keep business logic in the module that owns the business capability.
- Reuse business logic across all four portals.
- Keep role-based authorization and resource-level access checks separate from module ownership.
- Avoid unnecessary abstractions, boilerplate, and speculative future-proofing.
- Preserve existing API contracts, authentication, authorization, database behavior, integrations, and business rules.

### Do not use role folders as the primary business architecture

Do not make structures such as the following the primary home of business logic:

```text
src/
├── gym/
│   ├── memberships/
│   └── payments/
├── client/
│   ├── memberships/
│   └── payments/
├── trainer/
└── admin/
```

This can duplicate business rules and make shared features harder to maintain.

Instead, discover and group code into business modules such as:

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── gyms/
│   ├── clients/
│   ├── trainers/
│   ├── memberships/
│   ├── payments/
│   ├── bookings/
│   ├── notifications/
│   └── reports/
├── shared/
├── config/
├── main/
├── cron.ts
├── worker.ts
└── index.ts
```

The module names above are examples only. Use the real business capabilities found in the repository. Do not create empty or unnecessary modules.

**Do not create a `portals/gym`, `portals/client`, `portals/trainer`, or `portals/admin` structure by default.** Keep portal-specific routes or presentation code separate only if the audit identifies a concrete benefit. Portal-specific presentation must not own or duplicate shared business logic.

## 3. Phase One: Audit Before Modifying

Inspect the repository thoroughly before moving or editing files.

Identify:

1. Backend framework, TypeScript version/configuration, package manager, and scripts.
2. Existing routes, controllers, services, use cases, entities, repositories, DTOs, schemas, validators, and middleware.
3. Current global layers and any role-based folders.
4. Actual roles, portal capabilities, permissions, and resource ownership rules.
5. Database technology, ORM, schema, migrations, and transaction handling.
6. Authentication, authorization, tenant isolation, and gym ownership checks.
7. Background workers, queues, scheduled jobs, email/notification processing, retries, and concurrency.
8. External integrations and infrastructure dependencies.
9. Existing tests, linting, formatting, CI/CD, environment variables, and deployment processes.
10. Duplicated business logic, circular dependencies, misplaced responsibilities, and unnecessary abstractions.

Trace important flows from HTTP entry point through business logic to the database or external service.

Before making changes, produce an audit containing:

- Current architecture and its main problems.
- Actual business modules and their responsibilities.
- Proposed target architecture.
- Existing role and permission behavior that must be preserved.
- High-risk dependencies and behavior that must not change.
- A mapping from existing files to proposed destinations.
- A phased migration plan.

Do not begin a bulk file move before completing this audit. After presenting the plan, proceed incrementally if no potentially breaking ambiguity requires clarification.

## 4. Phase Two: Design Modules Around Business Capabilities

Use a structure like this as a guide, adapting it to the real codebase:

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── gyms/
│   ├── clients/
│   ├── trainers/
│   ├── memberships/
│   ├── payments/
│   ├── bookings/
│   ├── notifications/
│   └── reports/
├── shared/
│   ├── errors/
│   ├── middleware/
│   ├── logger/
│   ├── database/
│   └── utils/
├── config/
├── main/
│   ├── app.ts
│   ├── routes.ts
│   └── container.ts
├── cron.ts
├── worker.ts
└── index.ts
```

Only create `main/container.ts` if it fits the existing dependency-wiring approach. Do not introduce a complex dependency-injection framework unnecessarily.

### Module internals

For modules that need clear architectural layers, use a structure similar to:

```text
memberships/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── errors/
│   └── repositories/
├── application/
│   ├── use-cases/
│   ├── interfaces/
│   └── DTOs/
├── infrastructure/
│   ├── repositories/
│   └── adapters/
├── presentation/
│   ├── controllers/
│   ├── routes/
│   └── validators/
└── index.ts
```

Use only the subfolders justified by actual responsibilities. Simple features may need fewer layers. Do not create empty directories or files merely to make every module look identical.

Do not create an interface, abstract class, factory, mapper, or wrapper for every class automatically. Every abstraction must have a clear reason to exist.

## 5. Phase Three: Clean Architecture and Module Boundaries

Apply these responsibilities:

- **Domain:** Business entities, value objects, invariants, domain rules, and domain errors. Must not depend on Express, an ORM, a database client, or external services.
- **Application:** Use cases and application workflows. Coordinates business operations and depends on appropriate abstractions for external capabilities.
- **Infrastructure:** Database and ORM implementations, external service adapters, queue implementations, email delivery, and other technical details.
- **Presentation:** HTTP routes, controllers, request validation, and response mapping.
- **Composition root:** Wires concrete implementations to abstractions during application startup.

### Dependency rules

- Presentation depends on application use cases.
- Application depends on domain logic and appropriate interfaces.
- Infrastructure implements interfaces needed by inner layers.
- Domain must not depend on outer layers.
- Use cases must not depend on Express request or response objects.
- Controllers must not directly access ORM models or database clients.
- Do not leak ORM-specific models into domain entities or public business contracts.
- Repository contracts should live in an appropriate inner layer; implementations belong in infrastructure.
- Keep transactions and business invariants explicit.
- Avoid circular dependencies.
- Cross-module communication must use deliberate public module contracts rather than importing another module's internal implementation files.
- Each module should expose a clear public API through `index.ts` or the existing module registration mechanism.
- Do not create a service locator or global mutable state to hide dependencies.

## 6. Phase Four: Four Roles and Four Portals

Inspect the existing role names, permissions, portal capabilities, and route behavior. Do not invent role names or change their semantics.

Requirements:

- Keep authentication centralized where appropriate.
- Reuse business modules across portals.
- Enforce authorization in the backend, not only in the frontend.
- Distinguish role authorization from resource-level authorization.
- Verify gym ownership, tenant boundaries, and resource access wherever applicable.
- Do not duplicate membership, payment, client, or gym business logic across role folders.
- Preserve route prefixes, response shapes, and status codes unless a change is explicitly necessary and approved.
- A role check alone is not sufficient to establish ownership of a resource.

For example, a gym owner must not access another gym's clients simply by changing an ID in the URL. Ensure the existing system's equivalent access rules remain enforced.

## 7. Phase Five: Background Processing and Application Startup

Inspect the current `index.ts`, `cron.ts`, and `worker.ts`. Preserve their actual responsibilities and deployment conventions.

As appropriate:

- `index.ts`: Starts the application.
- `main/app.ts`: Configures the HTTP application and middleware.
- `main/routes.ts`: Registers module routes.
- `cron.ts`: Registers scheduled tasks.
- `worker.ts`: Starts background processing.

Scheduled jobs and workers should invoke reusable application use cases or module public APIs. They must not duplicate business logic.

Preserve queue configuration, retries, concurrency, graceful shutdown, environment variables, and deployment requirements. Ensure jobs and workers are not accidentally started multiple times when the HTTP application starts.

## 8. Phase Six: Database and Integrations

Preserve the current database technology, ORM, schema, migrations, and existing data.

- Do not change schemas or rename tables/collections merely to fit the new folder structure.
- Do not regenerate migrations unnecessarily.
- Preserve transaction boundaries, data integrity, and payment consistency.
- Keep database-specific logic inside infrastructure adapters.
- Preserve email, storage, payment gateway, Redis, queue, and other existing integrations.
- Do not introduce microservices, extra databases, or new infrastructure without explicit justification.
- Avoid duplicate queries, N+1 query patterns, and unnecessary database round trips when refactoring affected code.

## 9. Mandatory Engineering Standards: Strict TypeScript, SOLID, and Code Quality

These standards apply to **all new, modified, and refactored code across every module and entry point**.

### A. Strict TypeScript — No `any`

- Do not use explicit `any` in application code.
- Do not introduce `any` in parameters, return types, variables, generics, callbacks, error handlers, DTOs, repository contracts, or external adapters.
- Do not use `as any`, `any[]`, or `Record<string, any>`.
- Do not use `@ts-ignore`, `@ts-nocheck`, or similar suppressions to make the refactor compile.
- Do not weaken TypeScript compiler settings to hide errors. Audit the current configuration and enable strict options where feasible, fixing resulting issues in manageable steps.
- Use `unknown` for genuinely unknown external values and narrow it with runtime validation, type guards, or schema validation.
- Use meaningful interfaces, type aliases, discriminated unions, generics, and inferred types where appropriate.
- Use `never` for exhaustiveness checks where applicable.
- Define explicit and meaningful input/output types for public APIs, use cases, repository contracts, and external integrations.
- Avoid unnecessary assertions; never use them instead of runtime validation.
- Reuse types generated by the existing ORM or validation library when appropriate.
- Do not introduce unsafe typing indirectly through casts or poorly typed helpers.

If legacy `any` usages exist, identify them, replace them in affected code where practical, and report remaining occurrences. Do not silently leave newly introduced usages.

Configure the existing ESLint setup to reject explicit `any` and relevant unsafe TypeScript patterns where compatible with the project.

### B. SOLID Principles — Mandatory Throughout

Apply SOLID pragmatically to modules, use cases, entities, controllers, repositories, workers, and integrations.

**1. Single Responsibility Principle (SRP)**

- Each class, function, and module must have a clear responsibility.
- Controllers handle HTTP concerns, not business workflows or database operations.
- Use cases implement one coherent application operation.
- Repositories handle persistence, not unrelated business decisions.
- Workers process jobs and delegate business operations to application use cases.
- Avoid giant service classes that manage unrelated features.

**2. Open/Closed Principle (OCP)**

- Allow new behavior to be added without unnecessarily changing stable, unrelated logic.
- Use composition, strategies, or interfaces where there are genuine extension points.
- Avoid conditionals that require changes across many unrelated places when adding a supported provider or channel.
- Do not create speculative abstractions for hypothetical requirements.

**3. Liskov Substitution Principle (LSP)**

- Implementations must honor interface and base-type contracts.
- Repository implementations must preserve expected behavior, error semantics, and return types.
- Avoid inheritance when composition is simpler and safer.

**4. Interface Segregation Principle (ISP)**

- Prefer small, cohesive interfaces over large interfaces with unrelated methods.
- Components should depend only on the capabilities they need.
- Do not create an interface for every class merely to satisfy a rule mechanically.

**5. Dependency Inversion Principle (DIP)**

- High-level business logic must not depend directly on low-level infrastructure implementations.
- Application use cases must depend on appropriate abstractions for persistence and external operations.
- Keep ORM clients, HTTP clients, email providers, and queue implementations in infrastructure.
- Wire concrete implementations at the composition root.
- Avoid circular dependencies and hidden dependencies through global mutable state.

Apply SOLID sensibly. Do not confuse compliance with creating excessive layers or abstractions.

### C. Repository Pattern

- Define repository contracts around business persistence needs.
- Keep ORM queries and database-specific behavior in infrastructure implementations.
- Do not expose database clients or ORM delegates to controllers or domain entities.
- Avoid generic base repositories that hide business-specific behavior.
- Use transactions for operations that require atomicity.
- Preserve existing data integrity and query semantics.

### D. Validation, Errors, and Security

- Validate untrusted HTTP inputs and external payloads at system boundaries using the existing validation library or a suitable established approach.
- Never trust TypeScript types alone to validate runtime data.
- Use centralized error handling with meaningful, typed application and domain errors.
- Do not expose stack traces, secrets, database details, or sensitive information in production responses.
- Enforce authorization and resource ownership in the backend.
- Protect gym-level tenant boundaries and prevent unauthorized cross-gym access.
- Keep authentication, authorization, and business validation distinct.
- Never log passwords, access tokens, refresh tokens, or sensitive payment information.

### E. Testing and Maintainability

- Write unit tests for meaningful domain rules and application use cases.
- Test repository implementations and database behavior through integration tests where appropriate.
- Test role permissions and resource ownership for sensitive endpoints.
- Mock external dependencies at appropriate boundaries without over-mocking internal implementation details.
- Keep functions cohesive, names descriptive, and dependencies explicit.
- Avoid duplicated business logic and premature optimization.
- Prefer readable, straightforward code over clever abstractions.
- Do not change working business behavior merely to make the architecture look cleaner.

### F. Automatic Enforcement

Inspect the existing TypeScript, ESLint, formatter, and CI configuration.

Where compatible:

1. Enable strict TypeScript settings and address resulting errors.
2. Configure linting to reject explicit `any` and relevant unsafe operations.
3. Ensure type checking and linting run in the existing CI pipeline.
4. Add architecture checks where practical to prevent forbidden cross-module imports and dependency cycles.
5. Run checks after each migration stage and at the end.

Do not hide errors by weakening compiler options, disabling lint rules, or adding broad suppressions.

## 10. Incremental Refactoring Plan

Perform the migration in small, verifiable stages:

1. Establish a baseline by running existing tests, type checking, linting, and builds.
2. Complete the architecture audit and file-migration plan.
3. Define module boundaries and public APIs.
4. Migrate one relatively independent feature.
5. Update imports and dependency wiring.
6. Run relevant tests and compare behavior.
7. Migrate remaining features in manageable groups.
8. Update routes, workers, cron jobs, and startup wiring.
9. Remove obsolete files only after verifying they are unused.
10. Run the complete validation suite.

Keep the application buildable at reasonable checkpoints.

If there are uncommitted changes, preserve them. Do not reset branches, delete user work, amend commits, force-push, or perform destructive Git operations.

If an ambiguous business rule or potentially breaking API/database change is discovered, explain the issue and ask before changing it.

## 11. Validation and Regression Prevention

After refactoring, verify:

- TypeScript compilation succeeds.
- Linting and formatting checks pass.
- Existing unit and integration tests pass.
- Production build succeeds.
- Existing routes are registered correctly.
- Authentication and authorization behave as before.
- Resource ownership and tenant isolation remain enforced.
- Database queries and transactions preserve their semantics.
- Cron jobs and workers start and shut down correctly.
- No duplicate job registration or processing has been introduced.
- Environment variables and deployment scripts remain valid.
- There are no accidental circular dependencies or broken imports.

Run checks rather than assuming they pass. If a check fails, determine whether it failed before the refactor or was introduced by it. Document unresolved failures clearly.

## 12. Final Compliance Audit

Before declaring the refactor complete:

- Search the modified backend for explicit `any`, `as any`, and unsafe type suppressions.
- Report existing legacy occurrences separately from newly introduced occurrences.
- Verify that all new or refactored code follows SOLID principles.
- Check Clean Architecture dependency direction and module boundaries.
- Check for circular dependencies and unintended cross-module imports.
- Verify the lint, type-check, build, and relevant test results.
- Document remaining violations, explain why they remain, and identify next steps.

**Non-negotiable acceptance criteria:** No newly introduced explicit `any`; no intentional SOLID violations; no weakened TypeScript safety checks; no duplicated business logic across portals; no business logic placed in the wrong architectural layer for convenience.

## 13. Final Deliverables

Provide:

1. Summary of the original architectural problems.
2. Final folder structure.
3. Mapping of important old file locations to new locations.
4. Module responsibilities and public contracts.
5. Dependency rules and module boundaries established.
6. How all four portals and their permissions are handled without duplicating business logic.
7. How cron jobs, workers, and shared infrastructure are organized.
8. List of files created, moved, modified, and deleted.
9. Actual test, lint, type-check, and build results, including failures.
10. A compliance report covering TypeScript safety, SOLID, Clean Architecture, module dependencies, lint rules, and unresolved violations.
11. Remaining architectural risks and recommended follow-up tasks.

## Execution Instructions

Start with the audit and migration plan. Do not immediately perform a bulk file move. Then proceed incrementally, validating each stage.

**Definition of success:** FitZelly remains functionally equivalent while becoming a maintainable Modular Monolith organized by business capability, with pragmatic Clean Architecture boundaries, explicit dependencies, strict TypeScript safety, SOLID principles, and reusable business logic shared safely across all four portals.
"""

output_path = "/mnt/data/fitzelly-modular-monolith-refactor-prompt.md"
pypandoc.convert_text(
    markdown,
    "md",
    format="md",
    outputfile=output_path,
    extra_args=["--standalone"]
)
print(f"Created: {output_path}")
