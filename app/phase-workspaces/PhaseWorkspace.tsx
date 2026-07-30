'use client';

import { useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronRight, Code2, Download, ExternalLink,
  FileCheck2, FileCode2, FolderKanban, GitBranch, LayoutTemplate, Play,
  RefreshCw, Rocket, Send, ShieldCheck, Upload, Workflow,
} from 'lucide-react';
import './phase-workspace.css';

type Stage = 5 | 6 | 7 | 8;

const stageData = {
  5: {
    crumb: 'Prototypes (Penpot)', title: 'Prototypes (Penpot)', badge: 'AI-Assisted',
    subtitle: 'AI-generated interactive prototypes based on GX1 Screen Specifications and component library.',
    accent: 'purple', score: '88%', scoreLabel: 'Prototype Readiness Score',
    tabs: ['1. Prototype Overview', '2. Screen List', '3. User Flows', '4. Component Usage', '5. Interactions', '6. Prototype Feedback'],
  },
  6: {
    crumb: 'Front-End Code', title: 'Front-End Code Workbench', badge: 'AI-Assisted',
    subtitle: 'Generate, review and package implementation-ready front-end code from approved prototypes.',
    accent: 'blue', score: '91%', scoreLabel: 'Code Readiness Score',
    tabs: ['1. Code Overview', '2. Components', '3. Files', '4. Dependencies', '5. Quality', '6. Build History'],
  },
  7: {
    crumb: 'QA, Evidence & Approval', title: 'QA, Evidence & Approval', badge: 'Controlled',
    subtitle: 'Validate requirements, collect evidence and manage approval decisions across the delivery workflow.',
    accent: 'teal', score: '93%', scoreLabel: 'Quality Readiness Score',
    tabs: ['1. QA Overview', '2. Test Cases', '3. Evidence', '4. Defects', '5. Approvals', '6. Audit Trail'],
  },
  8: {
    crumb: 'Integration & Delivery', title: 'Integration & Delivery Workbench', badge: 'Release Ready',
    subtitle: 'Coordinate integration checks, delivery readiness and controlled production deployment.',
    accent: 'green', score: '90%', scoreLabel: 'Delivery Readiness Score',
    tabs: ['1. Delivery Overview', '2. Integrations', '3. Environments', '4. Release Package', '5. Deployment Plan', '6. Delivery Evidence'],
  },
} as const;

const screenNames = ['Dashboard (Overview)', 'Task List', 'Task Details', 'Create / Edit Task', 'Calendar View', 'My Tasks', 'Reports', 'User Management'];
const codeFiles = ['TaskList.tsx', 'TaskDetails.tsx', 'TaskForm.tsx', 'task-service.ts', 'task.types.ts'];
const checkRows = ['Requirements traceability verified', 'Responsive desktop layout checked', 'Accessibility and keyboard flow checked', 'Evidence attached to test run'];

export function PhaseWorkspace({ stage, onMsg, onNext }: { stage: Stage; onMsg: (message: string) => void; onNext: () => void }) {
  const data = stageData[stage];
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState(0);
  const ActionIcon = stage === 5 ? Play : stage === 6 ? Code2 : stage === 7 ? ShieldCheck : Rocket;

  return (
    <div className={`phase-workspace phase-${stage} accent-${data.accent}`}>
      <div className="phase-breadcrumb"><span>Home</span><ChevronRight size={12}/><span>BRD Pipeline</span><ChevronRight size={12}/><b>{data.crumb}</b></div>
      <div className="phase-heading">
        <div><h2>{data.title} <em>{data.badge}</em></h2><p>{data.subtitle}</p></div>
        <div className="phase-heading-actions">
          <button onClick={() => onMsg('Refreshing workspace data…')}><RefreshCw size={13}/> Sync</button>
          <button onClick={() => onMsg('Export prepared.')}><Download size={13}/> Export</button>
          <button className="phase-primary" onClick={onNext}>Next Step <ArrowRight size={13}/></button>
        </div>
      </div>

      <section className="phase-summary">
        <div className="phase-summary-icon"><ActionIcon size={23}/></div>
        <div className="phase-summary-meta">
          <span>BRD Title<b>Daily Task Management System</b></span>
          <span>Domain<b>Operations</b></span>
          <span>Complexity<b className="phase-chip">Medium</b></span>
          <span>Project<b>GSOLVE-PILOT-001</b></span>
          <span>Project Type<b>Internal Development</b></span>
        </div>
        <div className="phase-readiness"><div className="phase-ring">{data.score}</div><div><b>{data.scoreLabel}</b><small>Measured from approved workflow evidence.</small><a href="#details" onClick={(e) => { e.preventDefault(); onMsg('Opening readiness details…'); }}>View details →</a></div></div>
      </section>

      <div className="phase-tabs">{data.tabs.map((label, index) => <button key={label} className={tab === index ? 'active' : ''} onClick={() => setTab(index)}>{label}</button>)}</div>

      <div className="phase-layout">
        <div className="phase-main">
          {stage === 5 && <PrototypeContent selected={selected} setSelected={setSelected} onMsg={onMsg}/>} 
          {stage === 6 && <CodeContent selected={selected} setSelected={setSelected} onMsg={onMsg}/>} 
          {stage === 7 && <QualityContent selected={selected} setSelected={setSelected} onMsg={onMsg}/>} 
          {stage === 8 && <DeliveryContent selected={selected} setSelected={setSelected} onMsg={onMsg}/>} 
        </div>
        <aside className="phase-rail">
          <PhaseRail stage={stage} score={data.score} onMsg={onMsg}/>
        </aside>
      </div>
    </div>
  );
}

function Card({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return <section className="phase-card"><div className="phase-card-title"><h3>{title}</h3>{action && <button>{action} →</button>}</div>{children}</section>;
}

function PrototypeContent({ selected, setSelected, onMsg }: any) {
  return <div className="phase-two-up prototype-content">
    <Card title="PROTOTYPE OVERVIEW"><div className="phase-select-row"><label>Prototype Set<select><option>Version 1.0 - 20 Jul 2026</option></select></label><label>Fidelity<select><option>All</option></select></label></div><div className="phase-device-row">{['All', 'Desktop', 'Tablet', 'Mobile'].map((x, i) => <button className={i === 0 ? 'active' : ''} key={x}>{x}</button>)}</div><div className="phase-kpis">{[['12','Total Screens'],['9','High Fidelity'],['3','Low Fidelity'],['6','User Flows'],['88%','Spec Coverage']].map(([v,l]) => <span key={l}><b>{v}</b><small>{l}</small></span>)}</div><p className="phase-note">Interactive prototype created from approved GX1-S4 screen specifications. Core user journeys and components are covered.</p><button className="phase-outline" onClick={() => onMsg('Prototype notes opened.')}><FileCode2 size={13}/> Edit Notes</button></Card>
    <Card title="RECENT SCREENS (12)" action="View all screens"><div className="prototype-grid">{screenNames.map((name, i) => <button className={`prototype-thumb ${selected === i ? 'selected' : ''}`} key={name} onClick={() => setSelected(i)}><div className="mini-ui"><i/><i/><i/><strong>{i + 1}</strong></div><span>{i + 1}. {name}</span><em>Hi-Fi</em></button>)}</div></Card>
    <Card title="USER FLOWS (6)" action="View all flows"><div className="phase-flow">{['Login','Dashboard','Create Task','Assign Task','Track Progress','Complete Task'].map((x,i) => <span key={x}>{x}{i < 5 && <b>→</b>}</span>)}</div></Card>
    <Card title="PROTOTYPE FEEDBACK (Latest)" action="View all feedback"><SimpleTable rows={[['Add bulk task upload option','Jahir Hussain','Open'],['Change status color for overdue tasks','Zain Israr','In Progress'],['Add export to Excel in reports','Priya Nair','Resolved']]}/></Card>
  </div>;
}

function CodeContent({ selected, setSelected, onMsg }: any) {
  return <div className="phase-code-layout"><Card title="CODE EXPLORER"><div className="code-tree">{codeFiles.map((file,i) => <button className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)} key={file}><FileCode2 size={13}/>{file}<small>{i % 2 ? 'Updated' : 'Generated'}</small></button>)}</div><button className="phase-outline" onClick={() => onMsg('Component generation started.')}><Code2 size={13}/> Generate Component</button></Card><Card title="IMPLEMENTATION PREVIEW"><pre>{`export function ${codeFiles[selected].replace(/\..+$/, '')}() {\n  return (\n    <TaskPanel status="In Review" />\n  );\n}`}</pre><div className="code-status"><span><CheckCircle2 size={13}/> TypeScript valid</span><span><CheckCircle2 size={13}/> Lint clean</span><button onClick={() => onMsg('Build queued.')}><Play size={13}/> Run build</button></div></Card><Card title="GENERATED COMPONENTS" action="View all"><SimpleTable rows={codeFiles.map((x,i) => [x, i % 2 ? 'Reusable' : 'Page', i % 2 ? 'Ready' : 'Reviewed'])}/></Card><Card title="BUILD & QUALITY"><div className="phase-kpis">{[['26','Components'],['91%','Coverage'],['0','Build Errors'],['14','Warnings']].map(([v,l]) => <span key={l}><b>{v}</b><small>{l}</small></span>)}</div><div className="progress-list">{['Type safety','Component standards','Accessibility','Bundle quality'].map((x,i) => <label key={x}>{x}<i><b style={{width:`${94-i*3}%`}}/></i><strong>{94-i*3}%</strong></label>)}</div></Card></div>;
}

function QualityContent({ selected, setSelected, onMsg }: any) {
  return <div className="phase-two-up"><Card title="QUALITY OVERVIEW"><div className="phase-kpis">{[['36','Requirements'],['28','Passed'],['5','In Review'],['3','Open Issues']].map(([v,l]) => <span key={l}><b>{v}</b><small>{l}</small></span>)}</div><div className="quality-chart"><i/><i/><i/><svg viewBox="0 0 240 80"><polyline points="0,62 45,44 90,53 135,25 180,34 240,12"/><polyline className="alt" points="0,66 45,58 90,39 135,48 180,24 240,31"/></svg></div></Card><Card title="APPROVAL QUEUE" action="View all"><SimpleTable rows={[['Requirement normalisation','Rohit Sharma','Approved'],['Screen specification','System Architect','In Review'],['Prototype evidence','QA Lead','Pending'],['Release package','Product Owner','Pending']]}/></Card><Card title="TEST EVIDENCE" action="Upload evidence"><div className="check-list">{checkRows.map((x,i) => <button key={x} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}><CheckCircle2 size={14}/>{x}<span>{i === 2 ? 'In Review' : 'Verified'}</span></button>)}</div></Card><Card title="OPEN DEFECTS"><SimpleTable rows={[['QA-021','Missing due-date validation','Medium'],['QA-024','Mobile label overlap','Low'],['QA-027','Audit event not captured','High']]}/></Card></div>;
}

function DeliveryContent({ selected, setSelected, onMsg }: any) {
  return <div className="phase-two-up"><Card title="DELIVERY READINESS"><div className="phase-kpis">{[['8','Integrations'],['6','Verified'],['1','In Progress'],['1','Blocked']].map(([v,l]) => <span key={l}><b>{v}</b><small>{l}</small></span>)}</div><div className="progress-list">{['GSolve API', 'Notification service', 'Identity provider', 'Evidence repository'].map((x,i) => <label key={x}>{x}<i><b style={{width:`${98-i*7}%`}}/></i><strong>{98-i*7}%</strong></label>)}</div></Card><Card title="ENVIRONMENT STATUS"><div className="environment-grid">{['Development','Test','UAT','Production'].map((x,i) => <button key={x} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}><b>{x}</b><span>{i < 3 ? 'Healthy' : 'Scheduled'}</span><i/></button>)}</div></Card><Card title="RELEASE PACKAGE" action="Download"><SimpleTable rows={[['Front-end build','v1.0.0','Ready'],['API contracts','v1.0.0','Ready'],['Migration scripts','v1.0.0','Verified'],['Release notes','v1.0.0','Draft']]}/><button className="phase-primary wide" onClick={() => onMsg('Release package marked ready.') }><Rocket size={14}/> Mark Package Ready</button></Card><Card title="DEPLOYMENT PLAN"><div className="phase-flow">{['Build','QA Sign-off','Approval','Deploy','Verify'].map((x,i) => <span key={x}>{x}{i < 4 && <b>→</b>}</span>)}</div><button className="phase-outline" onClick={() => onMsg('Deployment plan opened.')}><Workflow size={13}/> View deployment plan</button></Card></div>;
}

function PhaseRail({ stage, score, onMsg }: { stage: Stage; score: string; onMsg: (m:string) => void }) {
  const headings = stage === 5 ? ['PROTOTYPE SUMMARY', 'PROTOTYPE ACTIONS', 'INTEGRATION STATUS', 'HELP & GUIDANCE'] : stage === 6 ? ['CODE SUMMARY', 'CODE ACTIONS', 'BUILD STATUS', 'HELP & GUIDANCE'] : stage === 7 ? ['QUALITY SUMMARY', 'APPROVAL ACTIONS', 'EVIDENCE STATUS', 'HELP & GUIDANCE'] : ['DELIVERY SUMMARY', 'RELEASE ACTIONS', 'INTEGRATION STATUS', 'HELP & GUIDANCE'];
  return <>{headings.map((heading, index) => <Card title={heading} key={heading}>{index === 0 ? <div className="rail-metrics">{[['Total Screens','12'],['Components','26'],['Evidence Linked','48'],['Readiness',score]].map(([l,v]) => <span key={l}>{l}<b>{v}</b></span>)}</div> : index === 1 ? <div className="rail-actions">{['Open workspace', 'Share with reviewers', 'Compare versions', 'Download package'].map(x => <button key={x} onClick={() => onMsg(`${x} opened.`)}><ExternalLink size={12}/>{x}</button>)}</div> : index === 2 ? <div className="rail-status"><span><CheckCircle2 size={13}/> Last sync: 20 Jul 2026 10:15 AM</span><span><CheckCircle2 size={13}/> Status: Synced</span></div> : <div className="rail-actions"><button><FolderKanban size={12}/> Getting started guide</button><button><FileCheck2 size={12}/> Standards and guidance</button></div>}</Card>)}</>;
}

function SimpleTable({ rows }: { rows: string[][] }) { return <table className="phase-table"><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, i) => <td key={i}>{i === row.length - 1 ? <span className="table-status">{cell}</span> : cell}</td>)}</tr>)}</tbody></table>; }
