'use client';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertCircle, AlertTriangle, ArrowRight, BarChart3, Bell, CalendarDays, Check, CheckCircle2, ChevronDown, CircleHelp, ClipboardList, Cloud, Code2, Copy, Edit3, ExternalLink, FileCheck2, FileText, Filter, Flag, Gauge, Headphones, Info, LayoutGrid, Menu, Monitor, PanelsTopLeft, RefreshCw, Rocket, Save, Search, Settings, Shield, ShieldCheck, Tag, Trash2, UploadCloud, Workflow, X } from 'lucide-react';
import './requirement-normalisation/norm.css';
import { LayoutRecommendationWorkspace } from './layout-recommendation/LayoutRecommendationWorkspace';
import { ScreenSpecificationWorkspace } from './screen-specification/ScreenSpecificationWorkspace';
import { PhaseWorkspace } from './phase-workspaces/PhaseWorkspace';
import { ProjectSelection } from './components/ProjectSelection';

// ─── shared primitives (unchanged from original) ──────────────────────────────
const steps = ['BRD Intake & Registration','Requirement Normalisation','Layout & Component Recommendation','GX1 Screen Specification','Prototype (Penpot)','Front-End Code Generation','QA, Evidence & Approval','Release & Deployment'];
const nav = [['intake','BRD Intake'],['requirements','Requirements'],['refresh','Requirement Normalisation'],['quality','BRD Quality Check'],['history','Intake History'],['layout','Layout & Components'],['screen','Screen Specification'],['prototype','Prototypes'],['code','Code Generation'],['qa','QA & Evidence'],['release','Releases']];
const schema = z.object({ title:z.string().min(1,'BRD title is required'), description:z.string().min(1,'Short description is required'), notes:z.string(), assignee:z.string().min(1) });
type FormData=z.infer<typeof schema>;
const iconSet = { info:Info, refresh:RefreshCw, upload:UploadCloud, check:CheckCircle2, trash:Trash2, bell:Bell, help:CircleHelp, menu:Menu, ext:ExternalLink, cal:CalendarDays, save:Save, document:FileCheck2, cloud:Cloud, support:Headphones, arrow:ArrowRight, close:X };
function I({n}:{n:keyof typeof iconSet}) { const Icon=iconSet[n]; return <Icon className={'ico '+n} aria-hidden="true" strokeWidth={1.7}/> }
const navSet: Record<string, React.ElementType> = { intake:FileText, check:Check, refresh:RefreshCw, quality:ClipboardList, history:BarChart3, requirements:ClipboardList, layout:LayoutGrid, screen:Monitor, prototype:PanelsTopLeft, code:Code2, qa:ShieldCheck, release:Rocket };
function NavIcon({name}:{name:string}) { const Icon=navSet[name] ?? FileText; return <Icon className="nav-ico" size={18} strokeWidth={1.65}/> }
function Label({children,required}:{children:React.ReactNode,required?:boolean}) { return <label>{children}{required && <b className="required"> *</b>}</label> }
function Section({title,children,className=''}:{title:React.ReactNode,children:React.ReactNode,className?:string}) {
 const projectTitle = typeof title === 'string' && title.includes('<small>');
 const isOptional = typeof title === 'string' && title.includes('(Optional)');
 const visibleTitle = typeof title === 'string' ? title.replace(/\s*<small>.*?<\/small>/, '') : title;
 return <section className={'form-card section '+className}><h3>{projectTitle ? <>{visibleTitle} <small>{isOptional ? '(Optional)' : '(From GSolve)'}</small></> : title}</h3>{children}</section>
}
function Meta({label,value}:{label:string,value:string}) { return <div className="meta"><span>{label}</span><strong>{value}</strong></div> }

// ─── Step 2 static data ───────────────────────────────────────────────────────
const SOURCE_CLAUSES = [
  { ref:'BRD-S3.2.1', statement:'The system shall allow task creation with owner, priority and due date.', page:12, type:'Functional',     status:'In Review'   },
  { ref:'BRD-S3.2.2', statement:'The system shall track approvals and status changes.',                     page:13, type:'Functional',     status:'Normalised'  },
  { ref:'BRD-S3.2.3', statement:'Users shall receive notifications for overdue tasks.',                     page:14, type:'Functional',     status:'In Review'   },
  { ref:'BRD-S3.2.4', statement:'Role-based access must be enforced.',                                      page:15, type:'Security',       status:'Unprocessed' },
  { ref:'BRD-S3.2.5', statement:'System shall maintain an audit log of all task updates.',                  page:16, type:'Non-Functional', status:'Normalised'  },
];
const TYPE_CLR: Record<string,string> = { Functional:'badge-blue', Security:'badge-amber', 'Non-Functional':'badge-purple' };
const STATUS_CLR: Record<string,string> = { 'In Review':'status-review', Normalised:'status-norm', Unprocessed:'status-unproc' };
const OPEN_ISSUES = [
  { text:'Missing actor for approval escalation', priority:'High'   },
  { text:'Unclear archive retention rule',        priority:'Medium' },
  { text:'Duplicate notification requirement',    priority:'Low'    },
];
const NORM_REGISTER = [
  { id:'NRM-REQ-014', title:'Task Creation with Owner, Priority and Due Date', type:'Functional', module:'Task Management', priority:'High',   owner:'Rohit Sharma (BA)', status:'In Review',   trace:'92%', updated:'20 Jul 2026 10:45 AM' },
  { id:'NRM-REQ-015', title:'Track Approvals and Status Changes',               type:'Functional', module:'Task Management', priority:'High',   owner:'Rohit Sharma (BA)', status:'Normalised',  trace:'95%', updated:'20 Jul 2026 10:32 AM' },
  { id:'NRM-REQ-016', title:'Notifications for Overdue Tasks',                  type:'Functional', module:'Notifications',   priority:'Medium', owner:'Pooja Verma (BA)',  status:'In Review',   trace:'88%', updated:'20 Jul 2026 10:32 AM' },
  { id:'NRM-REQ-017', title:'Role-Based Access Enforcement',                    type:'Security',   module:'Access Control',  priority:'High',   owner:'Arjun Mehta (BA)', status:'Unprocessed', trace:'',    updated:'20 Jul 2026 09:58 AM' },
];

// ─── Step 2 workspace component ───────────────────────────────────────────────
function ReqNormWorkspace({setMessage}:{setMessage:(m:string)=>void}) {
  const [sel,setSel]=useState(0); const [q,setQ]=useState(''); const [filt,setFilt]=useState('All');
  const [rTitle,setRTitle]=useState('Task Creation with Owner, Priority and Due Date');
  const [stmt,setStmt]=useState('The system shall allow authorised users to create tasks by specifying the owner, priority level and due date.');
  const [rType,setRType]=useState('Functional'); const [mod,setMod]=useState('Task Management'); const [actor,setActor]=useState('Task Manager');
  const [pri,setPri]=useState('High'); const [acc,setAcc]=useState('Task must be assigned to a valid user and due date cannot be in the past.');
  const [dep,setDep]=useState('User Management, Calendar Service'); const [own,setOwn]=useState('Rohit Sharma (BA)'); const [stat,setStat]=useState('In Review');
  const filtered=SOURCE_CLAUSES.filter(c=>(!q||c.ref.toLowerCase().includes(q.toLowerCase())||c.statement.toLowerCase().includes(q.toLowerCase()))&&(filt==='All'||c.status===filt));
  const clause=SOURCE_CLAUSES[sel];
  return (
    <>
      {/* Project Banner */}
      <div className="proj-banner">
        <div className="proj-banner-left">
          <span className="proj-icon"><FileText size={16}/></span>
          <div><b>GSolve Project</b><span>GSOLVE-PILOT-001</span></div>
          <div className="proj-sep"/>
          <div><b>GSolve Pilot Implementation</b></div>
        </div>
        <div className="proj-banner-mid">
          <span className="proj-icon doc"><FileText size={16}/></span>
          <div><b>BRD Document</b><span>Daily Task Management BRD v1.0</span></div>
        </div>
        <div className="proj-banner-mid">
          <span className="proj-status submitted">Submitted</span>
          <div><b>Intake Status</b><span>📅 01 May 2026</span></div>
        </div>
        <div className="proj-banner-right">
          <ExternalLink size={14}/>
          <small>Project metadata inherited from GSolve. Requirement records are traceable to the source BRD.</small>
        </div>
      </div>

      <div className="norm-grid">
        {/* LEFT: Source BRD Review */}
        <section className="norm-panel form-card">
          <h3 className="panel-title">1. SOURCE BRD REVIEW</h3>
          <div className="srch-row">
            <div className="srch-wrap"><Search size={13} className="srch-ico"/><input className="srch-inp" placeholder="Search clauses by keyword…" value={q} onChange={e=>setQ(e.target.value)}/></div>
            <button className="icon-btn" aria-label="Filter"><Filter size={14}/></button>
          </div>
          <div className="filter-tabs">
            {(['All','Unprocessed','In Review','Normalised','Needs Clarification'] as const).map(f=>{
              const cnt=f==='All'?SOURCE_CLAUSES.length:f==='Needs Clarification'?0:SOURCE_CLAUSES.filter(c=>c.status===f).length;
              return <button key={f} className={`ftab ${filt===f?'ftab-active':''}`} onClick={()=>setFilt(f)}>{f}  {cnt}</button>;
            })}
          </div>
          <div className="clause-table">
            <div className="clause-thead"><span>Source Ref</span><span>Clause / Statement</span><span>Page</span><span>Type (Sig.)</span><span>Status</span></div>
            {filtered.map(c=>{const idx=SOURCE_CLAUSES.indexOf(c);return(
              <div key={c.ref} className={`clause-row ${sel===idx?'clause-selected':''}`} role="button" tabIndex={0} onClick={()=>setSel(idx)} onKeyDown={e=>{if(e.key==='Enter')setSel(idx);}}>
                <span className="clause-radio"><span className={`radio-dot ${sel===idx?'radio-active':''}`}/>{c.ref}</span>
                <span className="clause-stmt">{c.statement}</span>
                <span>{c.page}</span>
                <span><span className={`badge ${TYPE_CLR[c.type]??'badge-blue'}`}>{c.type}</span></span>
                <span><span className={`status-pill ${STATUS_CLR[c.status]??''}`}>{c.status}</span></span>
              </div>
            );})}
          </div>
          {clause&&<div className="clause-detail">
            <div className="clause-detail-header"><span>Source Ref: <b>{clause.ref}</b></span><span>Page: <b>{clause.page}</b></span><span>Section: <b>3.2 Task Management</b></span></div>
            <p className="clause-text">Source Text:</p>
            <div className="clause-quote">{clause.statement}</div>
            <div className="clause-keywords"><Tag size={12}/> Extracted Keywords:<span className="kw-tag">task creation</span><span className="kw-tag">owner</span><span className="kw-tag">priority</span><span className="kw-tag">due date</span></div>
            <button className="ai-suggest-btn"><span className="ai-star">✦</span> AI Suggest (Beta)</button>
            <p className="ai-note">AI suggestions are advisory only. Review before applying.</p>
          </div>}
        </section>

        {/* CENTER: Normalised Requirement Form */}
        <section className="norm-panel form-card">
          <h3 className="panel-title">2. NORMALISED REQUIREMENT</h3>
          <div className="nf-row nf-row-2">
            <div><label className="nf-label">Requirement ID (Auto)</label><input className="nf-inp" readOnly value="NRM-REQ-014"/></div>
            <div><label className="nf-label">Requirement Title *</label><input className="nf-inp" value={rTitle} onChange={e=>setRTitle(e.target.value)}/></div>
          </div>
          <div>
            <label className="nf-label">Normalised Requirement Statement *</label>
            <div className="nf-tags-row"><span className="req-tag trackable">● TRACKABLE</span><span className="req-tag testable">● TESTABLE</span><button className="req-tag unclassified">UNFIX CLASSIFICATION</button></div>
            <div className="nf-counter-wrap"><textarea className="nf-ta" value={stmt} onChange={e=>setStmt(e.target.value)} maxLength={500}/><small className="nf-counter">{stmt.length} / 500</small></div>
          </div>
          <div className="nf-row nf-row-3">
            <div><label className="nf-label">Requirement Type *</label><select className="nf-sel" value={rType} onChange={e=>setRType(e.target.value)}><option>Functional</option><option>Non-Functional</option><option>Security</option><option>Business Rule</option><option>Integration</option></select></div>
            <div><label className="nf-label">Functional Module *</label><select className="nf-sel" value={mod} onChange={e=>setMod(e.target.value)}><option>Task Management</option><option>Notifications</option><option>Access Control</option></select></div>
            <div><label className="nf-label">Actor / User Role *</label><select className="nf-sel" value={actor} onChange={e=>setActor(e.target.value)}><option>Task Manager</option><option>Business Analyst</option><option>System Admin</option></select></div>
          </div>
          <div className="nf-row nf-row-3">
            <div><label className="nf-label">Priority *</label><select className="nf-sel" value={pri} onChange={e=>setPri(e.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></div>
            <div><label className="nf-label">Business Rule</label><input className="nf-inp" placeholder="e.g. BR-007"/></div>
            <div><label className="nf-label">Acceptance Criteria *</label><div className="nf-counter-wrap"><textarea className="nf-ta nf-ta-sm" value={acc} onChange={e=>setAcc(e.target.value)} maxLength={300}/><small className="nf-counter">{acc.length} / 300</small></div></div>
          </div>
          <div className="nf-row nf-row-3">
            <div><label className="nf-label">Dependencies</label><input className="nf-inp" value={dep} onChange={e=>setDep(e.target.value)}/></div>
            <div><label className="nf-label">Owner *</label><select className="nf-sel" value={own} onChange={e=>setOwn(e.target.value)}><option>Rohit Sharma (BA)</option><option>Pooja Verma (BA)</option><option>Arjun Mehta (BA)</option></select></div>
            <div><label className="nf-label">Status *</label><select className="nf-sel" value={stat} onChange={e=>setStat(e.target.value)}><option>In Review</option><option>Normalised</option><option>Needs Clarification</option><option>Unprocessed</option></select></div>
          </div>
          <div className="trace-section">
            <h4 className="trace-title">TRACEABILITY TO SOURCE BRD</h4>
            <div className="trace-thead"><span>Source Section</span><span>Source Page</span><span>Source Clause</span><span>Source Confidence ⓘ</span></div>
            <div className="trace-row"><span>3.2 Task Management</span><span>12</span><span>BRD-S3.2.1</span><span className="trace-conf"><span className="conf-bar"><span className="conf-fill" style={{width:'92%'}}/></span> 92%</span></div>
          </div>
          <div className="nf-actions">
            <button className="nf-btn-draft" onClick={()=>setMessage('Draft saved.')}><Save size={13}/> Save Draft</button>
            <button className="nf-btn-flag"  onClick={()=>setMessage('Gap flagged.')}><Flag size={13}/> Flag Gap</button>
            <button className="nf-btn-dup"   onClick={()=>setMessage('Duplicate flagged.')}><Copy size={13}/> Flag Duplicate</button>
            <button className="nf-btn-ready" onClick={()=>setMessage('Marked as ready.')}><CheckCircle2 size={13}/> Mark as Ready ⌄</button>
          </div>
        </section>

        {/* RIGHT RAIL */}
        <aside className="rail">
          <div className="rail-card"><div className="doc-meta">
            {[['Screen No.','GX1-S2'],['Asset / Artefact No.','GX1-NRM-002'],['Workflow Step','2 of 8'],['Version','1.0'],['Date','20 Jul 2026']].map(([l,v])=><div key={l}><span>{l}</span><b>{v}</b></div>)}
          </div></div>
          <div className="rail-card">
            <h3>REQUIREMENT QUALITY SUMMARY</h3>
            <div className="quality-donuts">
              {[{label:'Completeness Score',value:84,color:'#0a9549'},{label:'Traceability Score',value:92,color:'#078541'},{label:'Testability Score',value:76,color:'#d89b16'}].map(({label,value,color})=>(
                <div key={label} className="donut-wrap">
                  <svg viewBox="0 0 36 36" className="donut-svg"><circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8eeeb" strokeWidth="3"/><circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3.2" strokeDasharray={`${value} ${100-value}`} strokeLinecap="round" transform="rotate(-90 18 18)"/></svg>
                  <span className="donut-pct" style={{color}}>{value}%</span><p className="donut-label">{label}</p>
                </div>
              ))}
            </div>
            <div className="quality-stats">
              {[['Total Requirements','36'],['Ready for Review','14'],['Gaps Open','3'],['Duplicates','2'],['Ambiguities','4']].map(([l,v])=><div key={l} className="q-stat"><span>{l}</span><b>{v}</b></div>)}
            </div>
          </div>
          <div className="rail-card">
            <h3>OPEN ISSUES REGISTER</h3>
            {OPEN_ISSUES.map(({text,priority:p})=>(
              <div key={text} className="issue-row"><AlertTriangle size={12} className={`issue-ico ${p.toLowerCase()}`}/><span className="issue-text">{text}</span><span className={`issue-badge p-${p.toLowerCase()}`}>{p}</span></div>
            ))}
            <button className="view-all-btn">View all issues (8) →</button>
          </div>
          <div className="rail-card">
            <h3>REQUIREMENT TYPE BREAKDOWN</h3>
            <div className="type-breakdown">
              {[{label:'Functional',count:20,icon:<LayoutGrid size={13}/>,color:'#078541'},{label:'Non-Functional',count:6,icon:<AlertCircle size={13}/>,color:'#50545b'},{label:'Business Rule',count:4,icon:<FileText size={13}/>,color:'#d89b16'},{label:'Integration',count:3,icon:<ArrowRight size={13}/>,color:'#0a9549'},{label:'Security',count:2,icon:<CheckCircle2 size={13}/>,color:'#dc2626'},{label:'Reporting',count:1,icon:<Edit3 size={13}/>,color:'#9333ea'}].map(({label,count,icon,color})=>(
                <div key={label} className="type-row"><span className="type-ico" style={{color}}>{icon}</span><span className="type-label">{label}</span><b className="type-count">{count}</b></div>
              ))}
            </div>
          </div>
          <div className="rail-card">
            <h3>ACTIONS</h3>
            <div className="actions-list">
              <div className="action-item"><CheckCircle2 size={12} className="action-ico green"/> Auto-save enabled (last saved 10:45 AM)</div>
              <div className="action-item"><CheckCircle2 size={12} className="action-ico green"/> AI suggestion available for selected clause</div>
              <div className="action-item"><CheckCircle2 size={12} className="action-ico green"/> Source traceability linked to BRD</div>
              <div className="action-item"><AlertTriangle size={12} className="action-ico amber"/> Product Owner review required for contradictions</div>
            </div>
            <button className="submit-review-btn" onClick={()=>setMessage('Submitted for review.')}><ArrowRight size={14}/> Submit for Review</button>
            <button className="return-btn" onClick={()=>setMessage('Returned to Intake Notes.')}>← Return to Intake Notes</button>
          </div>
        </aside>
      </div>

      {/* Register Preview */}
      <div className="register-section form-card">
        <div className="register-header">
          <h3 className="panel-title" style={{marginBottom:0}}>NORMALISED REQUIREMENT REGISTER (PREVIEW)</h3>
          <button className="view-full-btn">View full register →</button>
        </div>
        <table className="reg-table">
          <thead><tr><th>Req ID</th><th>Title</th><th>Type</th><th>Module</th><th>Priority</th><th>Owner</th><th>Status</th><th>Traceability</th><th>Updated On</th></tr></thead>
          <tbody>
            {NORM_REGISTER.map(r=>(
              <tr key={r.id}>
                <td className="reg-id">{r.id}</td><td>{r.title}</td>
                <td><span className={`badge ${TYPE_CLR[r.type]??'badge-blue'}`}>{r.type}</span></td>
                <td>{r.module}</td><td>{r.priority}</td><td>{r.owner}</td>
                <td><span className={`status-pill ${STATUS_CLR[r.status]??''}`}>{r.status}</span></td>
                <td>{r.trace?<span className="trace-pct">Traceable ({r.trace})</span>:<span className="status-pill status-unproc">Pending</span>}</td>
                <td className="reg-date">{r.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ─── ROOT PAGE ────────────────────────────────────────────────────────────────
export default function Home(){
 const {register,handleSubmit,watch,formState:{errors}}=useForm<FormData>({defaultValues:{title:'Daily Task Management System',description:'System to manage daily tasks, assignments, tracking and approvals.',notes:'This is part of GSolve pilot phase 1.',assignee:'UX-CX Lead (Jahir Hussain)'}});
 const [reviewers,setReviewers]=useState(['AI Architect (Zain Israr)','System Architect']); const [tags,setTags]=useState(['Task Management','Operations','GSolve Pilot']); const [tag,setTag]=useState(''); const [file,setFile]=useState('Daily_Task_Management_BRD_v1.0.pdf'); const [message,setMessage]=useState(''); const [activeStep,setActiveStep]=useState(0); const [activeNav,setActiveNav]=useState(0); const input=useRef<HTMLInputElement>(null);
 const addTag=(e:React.KeyboardEvent<HTMLInputElement>)=>{if(e.key==='Enter'){e.preventDefault();const x=tag.trim();if(x&&!tags.some(t=>t.toLowerCase()===x.toLowerCase()))setTags([...tags,x]);setTag('')}};
 const choose=(f?:File)=>{if(!f)return;if(f.size>50*1024*1024||!/(pdf|vnd.openxmlformats-officedocument.wordprocessingml.document)$/.test(f.type))setMessage('Please choose a PDF or DOCX file under 50 MB.');else {setFile(f.name);setMessage('Document attached successfully.')}};
 const submit=(kind:string)=>handleSubmit((data)=>{const check=schema.safeParse(data);setMessage(check.success?`${kind} saved successfully.`:'Please complete all required fields.');})();
 
 const getHeaderSubtitle = () => {
   if (activeStep === 1) return 'Requirement Normalisation Workbench';
   return 'From BRD Intake to Production-Ready Front-End & Evidence';
 };

 return <div className={`shell screen-${activeStep + 1} ${activeStep === 3 ? 'screen-spec-shell' : ''}`}>
  <aside className="sidebar"><div className="brand"><button className="hamb" aria-label="Open navigation"><I n="menu"/></button><div><div className="logo">GX1</div><small>Platform</small></div></div><div className="nav-scroll"><div className="nav" style={{ marginBottom: 12 }}><NavIcon name="intake"/><span className="nav-label">Dashboard</span></div><p className="group">BRD PIPELINE <ChevronDown size={14}/></p>{nav.map(([i,name],x)=><div key={name} role="button" tabIndex={0} onClick={()=>{
    setActiveNav(x);
    if(x===0||x===1) setActiveStep(0);
    if(x===2) setActiveStep(1);
    if(x===5) setActiveStep(2);
    if(x===6) setActiveStep(3);
    if(x===7) setActiveStep(4);
    if(x===8) setActiveStep(5);
    if(x===9) setActiveStep(6);
    if(x===10) setActiveStep(7);
  }} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActiveNav(x)}}} className={'nav '+(x===activeNav?'active selected ':'')+(x>=2&&x<=6?'sub ':'') }><NavIcon name={i}/><span className="nav-label">{name}</span>{[0,1,7,8,9,10].includes(x)&&<ChevronDown className="nav-chevron" size={14}/>}</div>)}<div className="admin"><p className="group">ADMINISTRATION</p><div className="nav"><Settings className="nav-ico" size={18}/><span className="nav-label">Admin</span><ChevronDown className="nav-chevron" size={14}/></div><div className="nav"><BarChart3 className="nav-ico" size={18}/><span className="nav-label">Reports</span><ChevronDown className="nav-chevron" size={14}/></div></div></div><div className="side-bottom"><div className="context"><b>Project Context (GSolve)</b><span>GSOLVE-PILOT-001 <I n="ext"/></span></div><div className="profile"><div className="avatar">RS</div><div><b>Rohit Sharma</b><small>Business Analyst</small></div><ChevronDown size={14}/></div></div></aside>
  <main className="app"><header><div><h1>GX1 – BRD to Production Platform</h1><p>{getHeaderSubtitle()}</p></div><div className="head-right"><span className="bell"><I n="bell"/><b>12</b></span><I n="help"/><div className="avatar large">RS</div><div><strong>Rohit Sharma</strong><small>Business Analyst</small></div><span>⌄</span><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '4px' }}><span className="gx-logo-badge" style={{ margin: 0 }}>GREEN</span><span style={{ fontSize: '8px', color: '#078541', fontStyle: 'italic', fontWeight: 600 }}>Future: Envisioned</span></div></div></header>
   <div className="body"><nav className="stepper" aria-label="Workflow steps">{steps.map((s,i)=><div role="button" tabIndex={0} aria-current={i===activeStep?'step':undefined} onClick={()=>{
     setActiveStep(i);
     if (i === 0) setActiveNav(0);
     if (i === 1) setActiveNav(2);
     if (i === 2) setActiveNav(5);
     if (i === 3) setActiveNav(6);
     if (i === 4) setActiveNav(7);
     if (i === 5) setActiveNav(8);
     if (i === 6) setActiveNav(9);
     if (i === 7) setActiveNav(10);
   }} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActiveStep(i)}}} className={'step '+(i===activeStep?'current ':i<activeStep?'completed ':'')+(i===2?'long-title':'')} key={s}><span>{i<activeStep?<Check size={14} strokeWidth={2.5}/>:i+1}</span><b>{s}</b>{i<7&&<i>→</i>}</div>)}</nav>

   {/* ── STEP 1: BRD Intake ── */}
   {activeStep===0&&<div className="content"><div className="workspace"><div className="title"><h2>BRD Intake &amp; Registration</h2><p>Capture and register a new Business Requirement Document (BRD) against a GSolve project.</p></div><div className="notice"><I n="info"/> Project details and metadata are pulled from GSolve and cannot be edited here.</div>
    <ProjectSelection onMessage={setMessage}/>
    <form onSubmit={e=>{e.preventDefault();submit('BRD')}} className="form-grid"><Section title="2. &nbsp; BRD INFORMATION"><Label required>BRD Title</Label><input {...register('title')} aria-invalid={!!errors.title}/><Label required>Short Description</Label><div className="counter-wrap"><textarea {...register('description')} maxLength={500}/><small>{watch('description').length} / 500</small></div></Section><Section title="3. &nbsp; DOCUMENT UPLOAD"><Label required>Upload BRD Document (PDF/DOCX)</Label><div className="drop" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();choose(e.dataTransfer.files[0])}} onClick={()=>input.current?.click()}><I n="upload"/><b>Drag &amp; drop file here</b><span>or click to browse</span><input ref={input} type="file" accept=".pdf,.docx" onChange={e=>choose(e.target.files?.[0])}/></div>{file&&<div className="file"><span className="pdf">PDF</span><div><b>{file}</b><small>2.4 MB</small></div><I n="check"/><button aria-label="Remove file" onClick={()=>setFile('')}><I n="trash"/></button></div>}<p className="upload-note">Max file size: 50 MB <i/> Accepted formats: PDF, DOCX</p></Section>
     <Section title="4. &nbsp; CLASSIFICATION"><div className="two"><div><Label>Business Domain</Label><select defaultValue="Operations"><option>Operations</option></select></div><div><Label>Sub Domain</Label><select defaultValue="Task Management"><option>Task Management</option></select></div></div><div className="three"><div><Label required>Complexity</Label><select><option>Medium</option></select></div><div><Label required>Project Type</Label><select><option>Internal Development</option></select></div><div><Label required>Regulatory Impact</Label><select><option>Low</option></select></div></div></Section><Section title="5. &nbsp; ASSIGNMENT"><Label required>Assign To</Label><select {...register('assignee')}><option>UX-CX Lead (Jahir Hussain)</option></select><Label required>Reviewers</Label><div className="tag-select">{reviewers.map(r=><span key={r}>{r}<button type="button" onClick={()=>setReviewers(reviewers.filter(x=>x!==r))}>×</button></span>)}<b>⌄</b></div></Section>
     <Section title="6. &nbsp; PRIORITY &amp; TARGET"><div className="two"><div><Label>Priority</Label><select><option>🔴 &nbsp; High</option></select></div><div><Label>Target Release Date</Label><div className="date"><input defaultValue="30/09/2026"/><I n="cal"/></div></div></div></Section><Section title="7. &nbsp; TAGS &amp; NOTES <small>(Optional)</small>"><div className="two tag-notes"><div><Label>Tags</Label><div className="tag-input">{tags.map(t=><span key={t}>{t}<button type="button" onClick={()=>setTags(tags.filter(x=>x!==t))}>×</button></span>)}<input value={tag} onChange={e=>setTag(e.target.value)} onKeyDown={addTag} placeholder="Type and press Enter"/></div></div><div><Label>Notes</Label><div className="counter-wrap"><textarea {...register('notes')} maxLength={500}/><small>{watch('notes').length} / 500</small></div></div></div></Section></form>
   </div><aside className="rail"><div className="rail-card document"><div><span>Screen No.</span><b>GX1-S1</b></div><div><span>Asset / Artefact No.</span><b>GX1-BRD-INTAKE-001</b></div><div><span>Workflow Step</span><b>1 of 8</b></div><div><span>Version</span><b>1.0</b></div><div><span>Date</span><b>20 Jul 2026</b></div></div><Rail title="INPUT FIELDS CHECKLIST" rows={['Project Selection (From GSolve)','BRD Title','Document Upload','Classification','Assignment','Priority & Target']}/><Rail title="SYSTEM ACTIONS" rows={['Project details pulled from GSolve','BRD will be created with unique BRD ID','Metadata is auto-saved','Intake status set to "Draft" or "Submitted"','Notification sent to assigned team']} squared/><div className="rail-card help"><h3>HELP &amp; GUIDANCE</h3>{['How BRD intake works','BRD writing best practices','Classification guidelines','GSolve integration reference'].map(x=><p key={x}>• &nbsp;{x}<I n="ext"/></p>)}<button>♧ &nbsp; Contact Support</button></div></aside></div>}

   {/* ── STEP 2: Requirement Normalisation ── */}
   {activeStep===1&&<ReqNormWorkspace setMessage={setMessage}/>}

   {/* ── STEP 3: Layout & Component Recommendation ── */}
   {activeStep===2&&(
     <LayoutRecommendationWorkspace
       onMsg={setMessage}
       onNextStep={() => {
         setActiveStep(3);
         setActiveNav(6);
         setMessage('Proceeding to Step 4: GX1 Screen Specification...');
       }}
     />
   )}

   {/* ── STEP 4: GX1 Screen Specification ── */}
   {activeStep===3&&(
     <ScreenSpecificationWorkspace
       onMsg={setMessage}
       onNextStep={() => {
         setActiveStep(4);
         setMessage('Proceeding to Step 5: Prototype (Penpot)...');
       }}
     />
   )}

   {/* ── STEPS 5-8: implementation workspaces ── */}
   {activeStep > 3 && (
     <PhaseWorkspace
       stage={(activeStep + 1) as 5 | 6 | 7 | 8}
       onMsg={setMessage}
       onNext={() => {
         if (activeStep < 7) {
           const nextStep = activeStep + 1;
           setActiveStep(nextStep);
           setActiveNav([7, 8, 9, 10][nextStep - 4]);
           setMessage(`Proceeding to ${steps[nextStep]}…`);
         } else {
           setMessage('All workflow stages are complete.');
         }
       }}
     />
   )}

   </div>
   <footer><span>GX1 Platform <i/> Confidential – Internal Use Only</span><b>Classification: Internal &amp; Confidential</b><div>{activeStep===1?<><button onClick={()=>setMessage('Returned to Intake Notes.')}>← Return to Intake Notes</button><button className="submit" onClick={()=>setMessage('Submitted for review.')}>Submit for Review &nbsp; →</button></>:activeStep===2?<><button onClick={()=>{setActiveStep(1);setActiveNav(2);}}>← Previous Step</button><button className="submit" onClick={()=>{setMessage('Layout & Component recommendations confirmed!');setActiveStep(3);setActiveNav(6);}}>Confirm &amp; Continue &nbsp; →</button></>:activeStep===3?<><button onClick={()=>{setActiveStep(2);setActiveNav(5);}}>← Previous Step</button><button className="submit" onClick={()=>{setMessage('Screen Specification saved!');setActiveStep(4);}}>Save Specification &nbsp; →</button></>:<><button onClick={()=>submit('Draft')}><I n="save"/> Save as Draft</button><button className="submit" onClick={()=>submit('BRD')}>Submit for Processing &nbsp; →</button></>}</div><span>© GREEN Limited 2026. All rights reserved.</span></footer>{message&&<div role="status" className="toast">{message}<button onClick={()=>setMessage('')}>×</button></div>}</main></div>
}
function Rail({title,rows,squared=false}:{title:string,rows:string[],squared?:boolean}){return <div className="rail-card"><h3>{title}</h3>{rows.map(x=><p key={x}><I n={squared?'document':'check'}/>{x}</p>)}</div>}
