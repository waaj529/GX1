# GX1 Pixel-Accurate Coding Agent Prompt

Act as a principal frontend engineer specialising in pixel-accurate enterprise application interfaces.

Recreate the attached GX1 — BRD to Production Platform screenshot as a production-ready Next.js application using React, TypeScript and modular CSS.

Do not create a generic dashboard inspired by the reference. Reverse-engineer and reproduce the actual layout, spacing, typography, colours, borders, component hierarchy, form density and visual rhythm shown in the screenshot.

## Reference

```txt
Target viewport: 1536 × 1024
Sidebar width: approximately 220px
Top header height: approximately 78px
Right rail width: approximately 266px
```

## Required application regions

- fixed left sidebar;
- fixed top application header;
- eight-stage workflow stepper;
- BRD Intake & Registration page heading;
- GSolve information notice;
- full-width Project Selection section;
- project summary and metadata panels;
- BRD Information section;
- Document Upload section;
- Classification section;
- Assignment section;
- Priority & Target section;
- Tags & Notes section;
- right contextual rail;
- fixed lower footer;
- Save as Draft and Submit for Processing actions.

## Required workflow steps

```txt
1. BRD Intake & Registration
2. Requirement Normalisation
3. Layout & Component Recommendation
4. GX1 Screen Specification
5. Prototype (Penpot)
6. Front-End Code Generation
7. QA, Evidence & Approval
8. Release & Deployment
```

## Required technologies

```txt
Next.js
React
TypeScript
React Hook Form
Zod
CSS Modules or Tailwind with CSS variables
Playwright
```

## Engineering rules

1. Use reusable typed components rather than one monolithic page.
2. Reproduce all visible text from the screenshot.
3. Do not use lorem ipsum.
4. Do not remove or merge sections.
5. Do not redesign the branding.
6. Use compact enterprise spacing.
7. Use restrained shadows.
8. Keep card radii between 4px and 7px.
9. Use a deep corporate green close to `#078541`.
10. Use local SVG components where icon libraries do not visually match.
11. Keep the reference screenshot available for visual regression testing.
12. Use semantic HTML and accessible form controls.

## Functional requirements

Implement:

- text inputs;
- textareas with live character counters;
- accessible select components;
- reviewer multi-select tags;
- tag input with Enter-to-add;
- duplicate tag prevention;
- date input;
- priority indicator;
- PDF and DOCX drag-and-drop upload;
- 50 MB upload limit;
- file deletion;
- Save as Draft;
- Submit for Processing;
- required-field validation;
- project refresh loading state;
- success and error feedback;
- keyboard navigation;
- mobile sidebar drawer.

## Responsive requirements

### Desktop

```txt
Fixed sidebar
Main workspace and right rail
Two-column form sections
Full workflow labels
```

### Tablet

```txt
Collapsible sidebar
Right rail below main content
Workflow horizontally scrollable
Reduced metadata columns
```

### Mobile

```txt
Single-column layout
Stacked project summary
Right rail below form
Sticky action bar
44px touch targets
```

## Accessibility requirements

- actual `<label>` elements;
- visible focus states;
- `aria-current="step"` on the active step;
- `aria-describedby` for errors;
- keyboard-operable custom selects;
- upload usable without drag-and-drop;
- no status communicated by colour alone;
- focus trapping in mobile drawers.

## Deliverables

Provide:

1. all source files;
2. reusable React components;
3. mock project data;
4. TypeScript interfaces;
5. Zod validation schema;
6. responsive styling;
7. Playwright visual regression test;
8. README with installation instructions;
9. no TypeScript errors;
10. no browser-console errors.

## Visual verification

Capture the application at exactly `1536 × 1024` and compare it with the supplied screenshot.

Use a Playwright visual regression assertion similar to:

```ts
await expect(page).toHaveScreenshot("gx1-brd-intake.png", {
  fullPage: true,
  maxDiffPixelRatio: 0.015,
});
```

Continue adjusting dimensions, spacing, typography and icons until the result is visually pixel-close to the supplied design.
