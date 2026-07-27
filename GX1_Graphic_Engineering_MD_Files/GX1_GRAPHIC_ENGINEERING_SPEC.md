# GX1 — BRD to Production Platform
## Graphic Engineering Specification

## 1. Objective

Rebuild the supplied GX1 Platform screen as a pixel-accurate, production-quality web application interface.

The implementation must reproduce:

- overall page proportions;
- navigation hierarchy;
- spacing and alignment;
- typography;
- borders and shadows;
- form controls;
- status indicators;
- icons;
- multi-column layout;
- hover, focus and active states;
- responsive behaviour;
- footer actions;
- realistic form interactions.

Do not simplify the design into a generic dashboard. Every visible region must be represented as a reusable frontend component.

A true 100% clone requires the original fonts, SVG icons, assets and exact viewport measurements. From the screenshot alone, the target should be a pixel-close recreation within approximately 2–4 px of visual deviation.

---

## 2. Recommended Stack

```txt
Framework: Next.js 15+ with React and TypeScript
Styling: CSS Modules or Tailwind CSS with CSS variables
Icons: Lucide React, replaced by custom SVGs where necessary
Forms: React Hook Form
Validation: Zod
Selects: Radix UI or custom accessible components
Date picker: React Day Picker
File upload: custom drag-and-drop component
Testing: Playwright
Visual regression: Playwright screenshots
Linting: ESLint + Prettier
```

Do not use a large prebuilt dashboard theme. Build the layout and controls specifically for this design.

---

## 3. Reference Viewport

The screenshot has an approximate aspect ratio of:

```txt
1536 × 1024
```

Build the initial desktop implementation against:

```css
width: 1536px;
min-height: 1024px;
```

The interface must still work fluidly above and below that width.

---

## 4. Global Page Architecture

The application consists of five principal regions:

```txt
1. Fixed left sidebar
2. Fixed top application header
3. Horizontal workflow stepper
4. Main form workspace
5. Right contextual information rail
```

Approximate desktop grid:

```txt
Sidebar:           220px
Main content area: remaining width

Inside main content:
Primary workspace: minmax(760px, 1fr)
Right rail:        266px
Gap:               22px
```

Suggested application structure:

```tsx
<AppShell>
  <Sidebar />

  <ApplicationArea>
    <TopHeader />

    <PageBody>
      <WorkflowStepper />

      <ContentGrid>
        <MainWorkspace>
          <PageHeading />
          <InformationNotice />
          <ProjectSelection />
          <FormSections />
        </MainWorkspace>

        <ContextRail>
          <DocumentMetadata />
          <InputChecklist />
          <SystemActions />
          <HelpGuidance />
        </ContextRail>
      </ContentGrid>
    </PageBody>

    <BottomFooter />
  </ApplicationArea>
</AppShell>
```

---

## 5. Global Design Tokens

### Colours

```css
:root {
  --gx-green-900: #005c2d;
  --gx-green-800: #006f37;
  --gx-green-700: #078541;
  --gx-green-600: #0a9549;
  --gx-green-100: #e8f5ec;
  --gx-green-050: #f2faf5;

  --gx-red-600: #dc2626;
  --gx-amber-500: #d89b16;

  --gx-black: #111111;
  --gx-text-primary: #171717;
  --gx-text-secondary: #50545b;
  --gx-text-muted: #757b84;

  --gx-border: #d9dde1;
  --gx-border-light: #e7e9ec;

  --gx-surface: #ffffff;
  --gx-surface-soft: #fafbfb;
  --gx-surface-muted: #f4f5f5;

  --gx-info-bg: #edf7f0;
  --gx-info-border: #c9dfcf;

  --gx-shadow-card:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 1px 5px rgba(15, 23, 42, 0.03);
}
```

The primary green must appear deep and corporate rather than bright or neon.

### Typography

```css
font-family:
  "Inter",
  "Aptos",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

Recommended weights:

```txt
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

Approximate scale:

```css
--font-xs: 10px;
--font-sm: 11px;
--font-base: 12px;
--font-md: 13px;
--font-lg: 15px;
--font-xl: 20px;
--font-2xl: 23px;
```

Primary page title:

```css
font-size: 21px;
line-height: 1.25;
font-weight: 700;
letter-spacing: -0.25px;
```

Section titles:

```css
font-size: 11px;
line-height: 1.3;
font-weight: 700;
text-transform: uppercase;
```

Input values:

```css
font-size: 11px;
font-weight: 400;
```

### Borders and Radius

```css
--radius-sm: 3px;
--radius-md: 5px;
--radius-lg: 7px;
```

Use:

```txt
Inputs: 4–5px
Cards: 5–7px
Tags: 4px
Circular icons: 50%
```

Avoid oversized modern pill styling except for status badges and tags.

---

## 6. Sidebar Engineering

```css
.sidebar {
  width: 220px;
  min-width: 220px;
  height: 100vh;
  position: fixed;
  inset: 0 auto 0 0;
  background: #fff;
  border-right: 1px solid var(--gx-border-light);
  display: flex;
  flex-direction: column;
  z-index: 50;
}
```

The sidebar header is approximately 78 px high and contains:

- hamburger icon;
- green GX1 logo;
- small “Platform” label beneath the logo.

Navigation groups:

```txt
BRD PIPELINE
ADMINISTRATION
```

Primary item:

```css
min-height: 42px;
padding: 0 14px;
display: flex;
align-items: center;
gap: 12px;
font-size: 12px;
font-weight: 600;
```

Active item:

```css
background: linear-gradient(180deg, #0a7e3e, #006f35);
color: #fff;
border-radius: 5px;
box-shadow: 0 1px 3px rgba(0, 90, 45, 0.2);
```

Active nested item:

```css
background: #eaf5ed;
color: #146b39;
font-weight: 500;
```

Near the bottom, include the Project Context card and user profile card shown in the reference.

---

## 7. Top Application Header

```css
.top-header {
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  height: 78px;
  background: #fff;
  border-bottom: 1px solid var(--gx-border-light);
  z-index: 40;
}
```

Left content:

```txt
GX1 – BRD to Production Platform
From BRD Intake to Production-Ready Front-End & Evidence
```

Right content:

- notification bell;
- badge with `12`;
- help icon;
- user avatar;
- user name;
- role;
- dropdown chevron.

---

## 8. Workflow Stepper

There are eight steps:

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

Active number:

```css
background: var(--gx-green-700);
color: #fff;
```

Inactive number:

```css
background: #fff;
border: 1px solid #bfc4c8;
color: #222;
```

Active underline:

```css
height: 2px;
background: var(--gx-green-700);
```

The stepper should horizontally scroll below approximately 1100 px.

---

## 9. Main Content Grid

```css
.application-main {
  margin-left: 220px;
  padding-top: 78px;
  min-height: 100vh;
}

.page-content {
  padding: 17px 21px 55px 22px;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 266px;
  gap: 22px;
  align-items: start;
}
```

---

## 10. Page Header and Notice

Title:

```txt
BRD Intake & Registration
```

Subtitle:

```txt
Capture and register a new Business Requirement Document (BRD) against a GSolve project.
```

Notice:

```txt
Project details and metadata are pulled from GSolve and cannot be edited here.
```

```css
.info-notice {
  min-height: 31px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: var(--gx-info-bg);
  border: 1px solid var(--gx-info-border);
  border-radius: 4px;
  font-size: 11px;
}
```

---

## 11. Card System

```css
.form-card {
  background: #fff;
  border: 1px solid var(--gx-border-light);
  border-radius: 6px;
  box-shadow: var(--gx-shadow-card);
  padding: 12px;
}
```

Section header format:

```txt
1. PROJECT SELECTION (From GSolve)
```

The number and title are bold. The explanatory text is regular weight.

---

## 12. Project Selection

Selector value:

```txt
GSOLVE-PILOT-001 | GSolve Pilot Implementation
```

Project summary:

```txt
Project Code       GSOLVE-PILOT-001
Project Name       GSolve Pilot Implementation
Client             GREEN Limited
Project Manager    Jahir Hussain
Status             Active
```

Metadata:

```txt
Start Date             01 May 2026
Target End Date        31 Dec 2026
Currency               PGK
Project Type           Internal Development
Business Domain        Operations
Sub Domain             Task Management

Contract Reference     N/A
Budget (PGK)           250,000.00
Project Priority       High
Project Stage          Planning
Last Updated           20 Jul 2026 09:30 AM
Updated By             System (GSolve)
```

Desktop grid:

```css
grid-template-columns: repeat(6, minmax(0, 1fr));
column-gap: 21px;
row-gap: 15px;
```

---

## 13. Form Sections

```css
.form-sections-grid {
  display: grid;
  grid-template-columns: 1fr 1.04fr;
  gap: 6px;
}
```

Sections:

```txt
2. BRD INFORMATION
3. DOCUMENT UPLOAD
4. CLASSIFICATION
5. ASSIGNMENT
6. PRIORITY & TARGET
7. TAGS & NOTES
```

### BRD Information

```txt
BRD Title *
Daily Task Management System

Short Description *
System to manage daily tasks, assignments, tracking and approvals.
```

Counter:

```txt
72 / 500
```

### Document Upload

```txt
Upload BRD Document (PDF/DOCX) *
Drag & drop file here
or click to browse
```

Uploaded state:

```txt
Daily_Task_Management_BRD_v1.0.pdf
2.4 MB
```

Footer:

```txt
Max file size: 50 MB | Accepted formats: PDF, DOCX
```

### Classification

```txt
Business Domain        Operations
Sub Domain             Task Management
Complexity             Medium
Project Type           Internal Development
Regulatory Impact      Low
```

### Assignment

```txt
Assign To *
UX-CX Lead (Jahir Hussain)

Reviewers *
AI Architect (Zain Israr)
System Architect
```

### Priority and Target

```txt
Priority
High

Target Release Date
30/09/2026
```

### Tags and Notes

Tags:

```txt
Task Management
Operations
GSolve Pilot
```

Notes:

```txt
This is part of GSolve pilot phase 1.
```

Counter:

```txt
34 / 500
```

---

## 14. Right Context Rail

Cards:

```txt
Document Metadata
Input Fields Checklist
System Actions
Help & Guidance
```

Metadata values:

```txt
Screen No.            GX1-S1
Asset / Artefact No.  GX1-BRD-INTAKE-001
Workflow Step         1 of 8
Version               1.0
Date                  20 Jul 2026
```

Checklist:

```txt
Project Selection (From GSolve)
BRD Title
Document Upload
Classification
Assignment
Priority & Target
```

System actions:

```txt
Project details pulled from GSolve
BRD will be created with unique BRD ID
Metadata is auto-saved
Intake status set to “Draft” or “Submitted”
Notification sent to assigned team
```

Help links:

```txt
How BRD intake works
BRD writing best practices
Classification guidelines
GSolve integration reference
```

Button:

```txt
Contact Support
```

---

## 15. Fixed Bottom Footer

Left:

```txt
GX1 Platform | Confidential – Internal Use Only
```

Centre:

```txt
Classification: Internal & Confidential
```

Right:

```txt
© GREEN Limited 2026. All rights reserved.
```

Actions:

```txt
Save as Draft
Submit for Processing →
```

```css
.bottom-footer {
  position: fixed;
  left: 220px;
  right: 0;
  bottom: 0;
  height: 38px;
  background: #fff;
  border-top: 1px solid var(--gx-border-light);
  z-index: 45;
}
```

---

## 16. Input Styling

```css
.control {
  width: 100%;
  min-height: 29px;
  padding: 5px 9px;
  border: 1px solid #d7dade;
  border-radius: 4px;
  background: #fff;
  color: #222;
  font-size: 11px;
  line-height: 1.4;
  outline: none;
}

.control:focus {
  border-color: #18834a;
  box-shadow: 0 0 0 2px rgba(24, 131, 74, 0.1);
}
```

Required markers use red.

---

## 17. Component Inventory

```txt
AppShell
Sidebar
SidebarSection
SidebarItem
SidebarSubItem
SidebarProjectCard
SidebarUserCard
TopHeader
NotificationButton
UserMenu
WorkflowStepper
WorkflowStep
PageHeading
InfoNotice
FormCard
SectionHeading
Field
TextInput
Textarea
Select
MultiSelect
TagInput
DateInput
PrioritySelect
CharacterCounter
ProjectSelector
ProjectSummary
ProjectMetadataGrid
FileDropzone
UploadedFileRow
ContextCard
MetadataCard
ChecklistCard
SystemActionsCard
HelpCard
FooterBar
DraftButton
SubmitButton
```

Avoid one monolithic page component.

---

## 18. TypeScript Models

```ts
export interface WorkflowStep {
  id: number;
  label: string;
  status: "completed" | "active" | "upcoming";
}

export interface Project {
  code: string;
  name: string;
  client: string;
  projectManager: string;
  status: "Active" | "Inactive";
  startDate: string;
  targetEndDate: string;
  currency: string;
  projectType: string;
  businessDomain: string;
  subDomain: string;
  contractReference: string;
  budget: string;
  priority: "Low" | "Medium" | "High";
  stage: string;
  lastUpdated: string;
  updatedBy: string;
}

export interface UploadedDocument {
  id: string;
  filename: string;
  size: number;
  mimeType: string;
  status: "uploading" | "uploaded" | "error";
}

export interface BrdFormValues {
  projectCode: string;
  title: string;
  shortDescription: string;
  document: UploadedDocument | null;
  businessDomain: string;
  subDomain: string;
  complexity: string;
  projectType: string;
  regulatoryImpact: string;
  assignedTo: string;
  reviewers: string[];
  priority: string;
  targetReleaseDate: string;
  tags: string[];
  notes: string;
}
```

---

## 19. Interaction Requirements

- Expand and collapse sidebar groups.
- Preserve active navigation state.
- Support keyboard navigation.
- Validate required fields.
- Update character counters live.
- Allow partial Save Draft.
- Validate complete form on Submit.
- Prevent double submission.
- Refresh project metadata with loading and error states.
- Support PDF and DOCX drag-and-drop upload.
- Enforce the 50 MB maximum size.
- Add tags on Enter.
- Prevent duplicate tags.
- Support searchable reviewer multi-select.
- Close dropdowns with Escape.
- Make all custom controls keyboard accessible.

---

## 20. Responsive Behaviour

### ≥ 1440 px

```txt
Fixed sidebar
Visible right rail
Two-column form sections
Full workflow labels
```

### 1100–1439 px

```txt
Sidebar remains visible
Right rail approximately 240px
Metadata grid wraps
Workflow scrolls horizontally
```

### 768–1099 px

```txt
Sidebar becomes a drawer
Header spans full width
Right rail moves below the form
Project metadata becomes three columns
```

### < 768 px

```txt
Single-column form
Right rail below the form
Project summary stacks
Metadata becomes one or two columns
Sticky mobile action bar
```

---

## 21. Accessibility

- Use semantic HTML.
- Use actual labels for inputs.
- Add visible focus styles.
- Use `aria-current="step"` for the active workflow step.
- Connect errors using `aria-describedby`.
- Ensure upload works without drag-and-drop.
- Maintain minimum 44 px touch targets on mobile.
- Do not communicate state by colour alone.
- Trap focus inside mobile drawers and dialogs.

---

## 22. Suggested Folder Structure

```txt
src/
├── app/
│   ├── layout.tsx
│   └── brd-intake/
│       └── page.tsx
├── components/
│   ├── layout/
│   ├── workflow/
│   ├── form/
│   ├── brd/
│   └── context/
├── data/
├── schemas/
├── styles/
└── types/
```

---

## 23. Pixel-Accuracy Workflow

```txt
1. Implement the structural grid.
2. Capture at 1536 × 1024.
3. Overlay the implementation and reference at 50% opacity.
4. Correct major edges and column positions.
5. Match card heights and vertical rhythm.
6. Match typography and line heights.
7. Replace approximate icons with local SVGs.
8. Compare again at 100% zoom.
9. Create a Playwright baseline.
```

Example:

```ts
await expect(page).toHaveScreenshot("gx1-brd-intake.png", {
  fullPage: true,
  maxDiffPixelRatio: 0.015,
});
```

---

## 24. Acceptance Criteria

The implementation is complete when:

- sidebar and header dimensions match the reference;
- all eight workflow steps are present;
- every visible form section is implemented;
- all visible text is reproduced;
- the right context rail is complete;
- the uploaded PDF state is recreated;
- footer actions remain visible;
- there is no unexpected desktop overflow;
- all form controls function;
- keyboard navigation works;
- mobile and tablet layouts are intentional;
- visual regression tests pass;
- there are no TypeScript or browser-console errors.
