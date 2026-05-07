# Auto

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

**Debug requests, questions, and investigations:** answer or investigate first. Do not create a plan upfront — the user needs an answer, not a plan. A plan may become relevant later once the investigation reveals what needs to change.

**For all other tasks**, before writing any code, assess the scope of the actual change (not the prompt length — a one-sentence prompt can describe a large feature). Scale your approach:

- **Trivial** (typo, config tweak, single obvious change): implement directly, no plan needed.
- **Small** (a few files, clear what to do): write 2–3 sentences in `plan.md` describing what and why, then implement. No substeps.
- **Medium** (multiple components, design decisions, edge cases): write a plan in `plan.md` with requirements, affected files, key decisions, verification. Break into 3–5 steps.
- **Large** (new feature, cross-cutting, unclear scope): gather requirements and write a technical spec first (`requirements.md`, `spec.md` in `{@artifacts_path}/`). Then write `plan.md` with concrete steps referencing the spec.

**Skip planning and implement directly when** the task is trivial, or the user explicitly asks to "just do it" / gives a clear direct instruction.

To reflect the actual purpose of the first step, you can rename it to something more relevant (e.g., Planning, Investigation). Do NOT remove meta information like comments for any step.

Rule of thumb for step size: each step = a coherent unit of work (component, endpoint, test suite). Not too granular (single function), not too broad (entire feature). Unit tests are part of each step, not separate.

Update `{@artifacts_path}/plan.md` if it makes sense to have a plan and task has more than 1 big step.

## Bugs Found & Fixed

### [x] Step: Fix review/page.tsx hardcoded values
- Book Title showed `'The Magic Crayon'` and Art Style showed `'Playful Cartoon'` literally — now reads from localStorage

### [x] Step: Fix success/page.tsx hardcoded Order ID
- Was showing `#CB-9823-X12` — now reads actual `bookId` from URL query param (`?id=...`) via `useSearchParams`

### [x] Step: Fix step-3/page.tsx wrong icon
- `<Home>` icon used for "Geometric Mandala" option — replaced with `<LayoutGrid>`

### [x] Step: Fix preview/page.tsx duplicated MODELS config
- `MODELS` object defined twice inside component — extracted to module-level constant

### [x] Step: Fix brand/page.tsx non-functional Preview PDF button
- Button had no `onClick` — added handler with validation and user feedback

### [x] Step: Fix admin/books/page.tsx disabled security checks
- Admin auth guard was commented out — re-enabled `router.replace('/')` redirect and `if (!isAdmin) return null`
