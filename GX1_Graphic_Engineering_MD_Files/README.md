# GX1 Graphic Engineering Markdown Package

This package contains two Markdown documents for recreating the supplied GX1 interface.

## Files

### `GX1_GRAPHIC_ENGINEERING_SPEC.md`

A detailed graphic-engineering and frontend implementation specification covering:

- layout measurements;
- design tokens;
- page architecture;
- component inventory;
- field contents;
- interaction requirements;
- responsive behaviour;
- accessibility;
- TypeScript models;
- visual regression workflow;
- acceptance criteria.

### `GX1_CODING_AGENT_PROMPT.md`

A condensed prompt suitable for use with a coding agent to generate the application.

## Reference image

The original supplied screenshot should be kept available to the development environment and used as the baseline for visual comparison at:

```txt
1536 × 1024
```

## Recommended usage

1. Give the coding agent the screenshot.
2. Attach `GX1_GRAPHIC_ENGINEERING_SPEC.md`.
3. Paste or attach `GX1_CODING_AGENT_PROMPT.md`.
4. Request the complete Next.js project.
5. Run Playwright screenshot comparison.
6. Iterate using image overlays until the layout is pixel-close.
