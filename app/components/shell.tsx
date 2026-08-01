'use client';
import { BarChart3, Bell, ChevronDown, CircleHelp, ClipboardList, Code2, ExternalLink, FileText, LayoutGrid, Menu, Monitor, PanelsTopLeft, RefreshCw, Rocket, Settings, ShieldCheck } from 'lucide-react';

/* ─── shared icon primitive ────────────────────────────────────────────────── */
export type IcoName = keyof typeof icoMap;
const icoMap = { menu:Menu, bell:Bell, help:CircleHelp, ext:ExternalLink, refresh:RefreshCw } as const;
export function Ico({ n, className = '' }: { n: IcoName; className?: string }) {
  const Icon = icoMap[n];
  return <Icon className={`ico ${n} ${className}`} aria-hidden="true" strokeWidth={1.7} />;
}

/* ─── nav data ──────────────────────────────────────────────────────────────── */
export const STEPS = [
  'BRD Intake & Registration',
  'Requirement Normalisation',
  'Layout & Component Recommendation',
  'GX1 Screen Specification',
  'Prototype (Penpot)',
  'Front-End Code Generation',
  'QA, Evidence & Approval',
  'Release & Deployment',
];

const NAV: [string, string, boolean][] = [
  ['intake',        'BRD Intake',               false],
  ['check',         'Intake & Registration',     false],
  ['refresh',       'Requirement Normalisation', false],
  ['quality',       'BRD Quality Check',         false],
  ['history',       'Intake History',            false],
  ['requirements',  'Requirements',              true ],
  ['layout',        'Layout & Components',       true ],
  ['screen',        'Screen Specification',      true ],
  ['prototype',     'Prototypes',                true ],
  ['code',          'Code Generation',           true ],
  ['qa',            'QA & Evidence',             true ],
  ['release',       'Releases',                  true ],
];

const NAV_ICONS: Record<string, React.ElementType> = {
  intake: FileText, check: FileText, refresh: RefreshCw, quality: ClipboardList,
  history: BarChart3, requirements: ClipboardList, layout: LayoutGrid,
  screen: Monitor, prototype: PanelsTopLeft, code: Code2, qa: ShieldCheck, release: Rocket,
};
function NavIcon({ name }: { name: string }) {
  const Icon = NAV_ICONS[name] ?? FileText;
  return <Icon className="nav-ico" size={18} strokeWidth={1.65} />;
}

/* ─── Sidebar ───────────────────────────────────────────────────────────────── */
export function Sidebar({
  activeNav,
  onNav,
}: {
  activeNav: number;
  onNav: (i: number) => void;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <button className="hamb" aria-label="Open navigation"><Ico n="menu" /></button>
        <img className="brand-logo" src="/brand/gx1-logo.png" alt="GX1 Platform — AI-Driven Intelligence" />
      </div>

      <div className="nav-scroll">
        <p className="group">BRD PIPELINE <ChevronDown size={14} /></p>

        {NAV.map(([icon, name, hasChevron], idx) => (
          <div
            key={name}
            role="button"
            tabIndex={0}
            onClick={() => onNav(idx)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNav(idx); } }}
            className={`nav ${idx === activeNav ? 'active ' : ''}${idx === 1 || idx === 2 ? 'sub ' : ''}${idx === activeNav ? 'selected ' : ''}`}
          >
            <NavIcon name={icon} />
            <span className="nav-label">{name}</span>
            {hasChevron && <ChevronDown className="nav-chevron" size={14} />}
          </div>
        ))}

        <div className="admin">
          <p className="group">ADMINISTRATION</p>
          <div className="nav"><Settings className="nav-ico" size={18} /><span className="nav-label">Admin</span><ChevronDown className="nav-chevron" size={14} /></div>
          <div className="nav"><BarChart3 className="nav-ico" size={18} /><span className="nav-label">Reports</span><ChevronDown className="nav-chevron" size={14} /></div>
        </div>
      </div>

      <div className="side-bottom">
        <div className="context">
          <b>Project Context (GSolve)</b>
          <span>GSOLVE-PILOT-001 <Ico n="ext" /></span>
        </div>
        <div className="profile">
          <div className="avatar" />
          <div><b>Rohit Sharma</b><small>Business Analyst</small></div>
          <ChevronDown size={14} />
        </div>
      </div>
    </aside>
  );
}

/* ─── Top Header ────────────────────────────────────────────────────────────── */
export function AppHeader() {
  return (
    <header>
      <div>
        <h1>GX1 – BRD to Production Platform</h1>
        <p>Requirement Normalisation Workbench</p>
      </div>
      <div className="head-right">
        <span className="bell"><Ico n="bell" /><b>12</b></span>
        <Ico n="help" />
        <div className="avatar large" />
        <div><strong>Rohit Sharma</strong><small>Business Analyst</small></div>
        <span>⌄</span>
        <span className="gx-logo-badge">GREEN</span>
      </div>
    </header>
  );
}

/* ─── Workflow Stepper ──────────────────────────────────────────────────────── */
export function WorkflowStepper({
  activeStep,
  onStep,
}: {
  activeStep: number;
  onStep: (i: number) => void;
}) {
  return (
    <nav className="stepper" aria-label="Workflow steps">
      {STEPS.map((s, i) => (
        <div
          role="button"
          tabIndex={0}
          aria-current={i === activeStep ? 'step' : undefined}
          onClick={() => onStep(i)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStep(i); } }}
          className={`step ${i === activeStep ? 'current' : ''}`}
          key={s}
        >
          <span>{i + 1}</span>
          <b>{s}</b>
          {i < 7 && <i>→</i>}
        </div>
      ))}
    </nav>
  );
}

/* ─── Footer Bar ────────────────────────────────────────────────────────────── */
export function FooterBar({
  leftLabel = 'GX1 Platform',
  primaryLabel = 'Submit for Review',
  secondaryLabel = 'Return to Intake Notes',
  onPrimary,
  onSecondary,
}: {
  leftLabel?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  return (
    <footer>
      <span>{leftLabel} <i /> Confidential – Internal Use Only</span>
      <b>Classification: Internal &amp; Confidential</b>
      <div>
        <button onClick={onSecondary}>{secondaryLabel}</button>
        <button className="submit" onClick={onPrimary}>{primaryLabel} &nbsp;→</button>
      </div>
      <span>© GREEN Limited 2026. All rights reserved.</span>
    </footer>
  );
}

/* ─── Meta (small label/value pair used in rail cards) ─────────────────────── */
export function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="meta">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ─── Right-rail card ───────────────────────────────────────────────────────── */
export function RailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rail-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/* ─── Project context banner (shared across pages) ─────────────────────────── */
export function ProjectBanner() {
  return (
    <div className="proj-banner">
      <div className="proj-banner-left">
        <span className="proj-icon"><FileText size={16} /></span>
        <div>
          <b>GSolve Project</b>
          <span>GSOLVE-PILOT-001</span>
        </div>
        <div className="proj-sep" />
        <div>
          <b>GSolve Pilot Implementation</b>
        </div>
      </div>
      <div className="proj-banner-mid">
        <span className="proj-icon doc"><FileText size={16} /></span>
        <div>
          <b>BRD Document</b>
          <span>Daily Task Management BRD v1.0</span>
        </div>
      </div>
      <div className="proj-banner-mid">
        <span className="proj-status submitted">Submitted</span>
        <div>
          <b>Intake Status</b>
          <span>📅 01 May 2026</span>
        </div>
      </div>
      <div className="proj-banner-right">
        <Ico n="ext" />
        <small>Project metadata inherited from GSolve. Requirement records are traceable to the source BRD.</small>
      </div>
    </div>
  );
}
