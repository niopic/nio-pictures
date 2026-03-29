# Project Guidelines

## Primary Objective

- Migrate this legacy static photography site to Astro incrementally without losing content quality, branding voice, SEO intent, or route clarity.

## Migration Priorities

- Reuse shared page scaffolding via layouts to avoid duplicate head and footer markup.
- Prefer one-page-at-a-time migrations to keep diffs reviewable and safe.
- Preserve section order and key conversion-oriented marketing copy unless explicitly requested otherwise.

## Image Standards

- Use Astro Image for portfolio and content images as the default and expected approach.
- Prefer JPEG source uploads for new photography assets; let Astro generate optimized derivatives.
- Ensure image alt text remains meaningful and specific to the photograph context.
- When legacy assets are not directly compatible, implement the asset handling needed to keep Astro Image in use.

## File Organization

- Place migrated routes under src/pages with clear path parity to existing pages when possible.
- Place shared layouts in src/layouts.
- Keep related style and script changes minimal and local to the migrated page unless reuse is obvious.

## Validation

- Run available build or lint checks after migrations when feasible.
- Report blockers, assumptions, and any manual follow-ups clearly.

## Change Discipline

- Avoid unrelated refactors during migration tasks.
- Keep edits intentional and easy to review.
- Do not remove legacy files unless explicitly asked.
