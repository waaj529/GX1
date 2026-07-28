'use client';

import { useState } from 'react';
import {
  ArrowRight, Check, CheckCircle2, ChevronRight, Database, Download,
  ExternalLink, FileCheck, FileCode, FileText, Layout, Link2, Monitor,
  RefreshCw, Share2, ShieldCheck, Sliders, Table,
} from 'lucide-react';
import { RailCard } from '../components/shell';
import '../layout-recommendation/lcr.css';
import './spec.css';

interface ScreenSpecificationWorkspaceProps {
  onMsg: (msg: string) => void;
  onNextStep: () => void;
}

export function ScreenSpecificationWorkspace({
  onMsg,
  onNextStep,
}: ScreenSpecificationWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<number>(2);

  const dataEntities = [
    { num: 1, name: 'Task', desc: 'Core task information', source: 'Tasks Summary API', mandatory: true },
    { num: 2, name: 'Task Status', desc: 'Status master (Completed, In Progress, Pending, Overdue)', source: 'Status Master API', mandatory: true },
    { num: 3, name: 'User', desc: 'User who creates or owns tasks', source: 'User Service API', mandatory: true },
    { num: 4, name: 'Assignment', desc: 'Task assignment to users', source: 'Assignment API', mandatory: true },
    { num: 5, name: 'Deadline', desc: 'Task deadlines and due dates', source: 'Calendar Service API', mandatory: true },
    { num: 6, name: 'Priority', desc: 'Priority master (High, Medium, Low)', source: 'Priority Master API', mandatory: false },
    { num: 7, name: 'Comment', desc: 'Comments on tasks', source: 'Comments API', mandatory: false },
    { num: 8, name: 'Attachment', desc: 'Files attached to tasks', source: 'File Service API', mandatory: false },
  ];

  const fieldStructures = [
    { num: 1, name: 'task_id', type: 'UUID', source: 'Task', req: true, rule: 'System generated', example: 'c8d7b9b3-2f11-4e6a-9c...' },
    { num: 2, name: 'title', type: 'String (150)', source: 'Task', req: true, rule: 'Max 150 characters', example: 'Daily Operations Review' },
    { num: 3, name: 'status_id', type: 'String (20)', source: 'Task Status', req: true, rule: 'Must exist in status master', example: 'In Progress' },
    { num: 4, name: 'priority_id', type: 'String (20)', source: 'Priority', req: false, rule: 'Optional', example: 'High' },
    { num: 5, name: 'assigned_to', type: 'UUID', source: 'User', req: true, rule: 'Must be active user', example: '9f1a2c3d-8b7e-4a...' },
  ];

  const validationRules = [
    { num: 1, rule: 'Title is required', type: 'Mandatory', msg: 'Task title cannot be empty.' },
    { num: 2, rule: 'Due date cannot be in past for new tasks', type: 'Business', msg: 'Due date must be today or future date.' },
    { num: 3, rule: 'Assigned user must be active', type: 'Business', msg: 'Selected user is not active.' },
    { num: 4, rule: 'Priority must be valid', type: 'Reference', msg: 'Please select a valid priority.' },
    { num: 5, rule: 'Status transition validation', type: 'Business', msg: 'Invalid status transition.' },
  ];

  return (
    <>
      {/* ── Breadcrumb Bar ────────────────────────────────────────────────── */}
      <div className="lcr-breadcrumb">
        <span>Home</span>
        <ChevronRight size={12} />
        <span>BRD Pipeline</span>
        <ChevronRight size={12} />
        <span className="active">GX1 Screen Specification</span>
      </div>

      {/* ── Header Title & Actions ────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          GX1 Screen Specification
          <span className="lcr-header-badge">AI-Assisted</span>
        </h2>

        <div className="lcr-top-actions">
          <button className="lcr-action-btn" onClick={() => onMsg('Validating screen specification parameters...')}>
            <FileCheck size={13} /> Validate Specification
          </button>
          <button className="lcr-action-btn" onClick={() => onMsg('Exporting specification document...')}>
            <Download size={13} /> Export Specification
          </button>
          <button className="lcr-next-btn" onClick={onNextStep}>
            Next Step <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <p className="lcr-subtitle-desc">
        Define the detailed specification for each screen including data, logic, validations, UI components and interactions.
      </p>

      {/* ── Summary Card Banner ───────────────────────────────────────────── */}
      <div className="lcr-summary-card">
        <div className="lcr-summary-left">
          <div className="lcr-summary-icon">
            <Monitor size={22} />
          </div>

          <div className="lcr-summary-meta">
            <div className="lcr-meta-item">
              <span>BRD Title</span>
              <strong>Daily Task Management System</strong>
            </div>
            <div className="lcr-meta-item">
              <span>Domain</span>
              <strong>Operations</strong>
            </div>
            <div className="lcr-meta-item">
              <span>Sub Domain</span>
              <strong>Task Management</strong>
            </div>
            <div className="lcr-meta-item">
              <span>Complexity</span>
              <span className="lcr-badge-purple">Medium</span>
            </div>
            <div className="lcr-meta-item">
              <span>Project</span>
              <strong>GSOLVE-PILOT-001</strong>
            </div>
            <div className="lcr-meta-item">
              <span>Project Type</span>
              <strong>Internal Development</strong>
            </div>
          </div>
        </div>

        <div className="lcr-summary-right">
          <div className="lcr-gauge-wrap">
            <svg viewBox="0 0 36 36" className="lcr-gauge-svg">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8eeeb" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="#078541"
                strokeWidth="3.2"
                strokeDasharray="94 6"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <span className="lcr-gauge-pct">94%</span>
          </div>

          <div className="lcr-ai-info">
            <strong>AI Confidence Score</strong>
            <p>High confidence in screen specification.</p>
            <a href="#rationale" onClick={(e) => { e.preventDefault(); onMsg('Viewing AI specification rationale...'); }}>
              View AI rationale &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* ── Tabs Row ──────────────────────────────────────────────────────── */}
      <div className="lcr-tabs-bar">
        {[
          '1. Screen Overview',
          '2. Data Structure',
          '3. UI Components',
          '4. Business Logic & Validations',
          '5. User Interactions',
          '6. API & Integrations',
          '7. Acceptance Criteria',
        ].map((tab, idx) => (
          <button
            key={tab}
            className={`lcr-tab ${activeTab === idx + 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(idx + 1)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Main Workspace Grid ───────────────────────────────────────────── */}
      <div className="lcr-content-grid">
        {/* Left Sub-Grid (2x2 Panels) */}
        <div className="spec-workspace-grid">
          {/* Panel 1: Data Entities */}
          <div className="spec-panel">
            <h3 className="spec-panel-title">
              DATA ENTITIES <span className="lcr-info-icon" title="Source entities mapped from BRD">ⓘ</span>
            </h3>

            <table className="spec-table">
              <thead>
                <tr>
                  <th className="spec-num-col">#</th>
                  <th>Entity Name</th>
                  <th>Description</th>
                  <th>Source</th>
                  <th>Mandatory</th>
                </tr>
              </thead>
              <tbody>
                {dataEntities.map((ent) => (
                  <tr key={ent.name}>
                    <td className="spec-num-col">{ent.num}</td>
                    <td style={{ fontWeight: 600, color: '#171717' }}>{ent.name}</td>
                    <td style={{ color: '#50545b' }}>{ent.desc}</td>
                    <td style={{ color: '#50545b' }}>{ent.source}</td>
                    <td>
                      {ent.mandatory ? (
                        <span className="spec-yes-badge">
                          <Check size={10} strokeWidth={3} /> Yes
                        </span>
                      ) : (
                        <span className="spec-no-badge">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="spec-panel-footer-btn"
              onClick={() => onMsg('Opening full Data Dictionary view...')}
            >
              View Data Dictionary &rarr;
            </button>
          </div>

          {/* Panel 2: Data Flow Diagram */}
          <div className="spec-panel">
            <h3 className="spec-panel-title">DATA FLOW DIAGRAM</h3>

            <div className="spec-flow-container">
              <div className="spec-flow-diagram">
                {/* DB Node */}
                <div className="spec-flow-db">
                  <Database size={16} style={{ marginBottom: 2 }} />
                  GSolve DB
                </div>

                {/* API Node */}
                <div className="spec-flow-node">
                  <span>API Layer</span>
                  <small style={{ fontWeight: 'normal', color: '#757b84', fontSize: '8.5px' }}>(GSolve APIs)</small>
                </div>

                {/* Center Main Node */}
                <div className="spec-flow-node highlight">
                  <strong>GX1-S4</strong>
                  <span>Task Dashboard</span>
                </div>

                {/* UI Node */}
                <div className="spec-flow-node">
                  <span>UI Components</span>
                  <small style={{ fontWeight: 'normal', color: '#757b84', fontSize: '8.5px' }}>(React / Mantine)</small>
                </div>
              </div>
            </div>

            <button
              className="spec-panel-footer-btn"
              onClick={() => onMsg('Viewing full interactive Data Flow Diagram...')}
            >
              View Full Data Flow &rarr;
            </button>
          </div>

          {/* Panel 3: Field Structure */}
          <div className="spec-panel">
            <h3 className="spec-panel-title">
              FIELD STRUCTURE <span className="lcr-info-icon" title="Field definitions and data types">ⓘ</span>
            </h3>

            <table className="spec-table">
              <thead>
                <tr>
                  <th className="spec-num-col">#</th>
                  <th>Field Name</th>
                  <th>Data Type</th>
                  <th>Source Entity</th>
                  <th style={{ textAlign: 'center' }}>Required</th>
                  <th>Validation / Rules</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {fieldStructures.map((fld) => (
                  <tr key={fld.name}>
                    <td className="spec-num-col">{fld.num}</td>
                    <td className="spec-font-mono">{fld.name}</td>
                    <td style={{ color: '#50545b' }}>{fld.type}</td>
                    <td style={{ color: '#50545b' }}>{fld.source}</td>
                    <td style={{ textAlign: 'center' }}>
                      {fld.req ? <Check size={12} className="spec-check-icon" strokeWidth={2.5} /> : '—'}
                    </td>
                    <td style={{ color: '#50545b' }}>{fld.rule}</td>
                    <td className="spec-font-mono" style={{ color: '#757b84', fontSize: '9px' }}>{fld.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="spec-panel-footer-btn"
              onClick={() => onMsg('Viewing all 18 field structures...')}
            >
              View All Fields (18) &rarr;
            </button>
          </div>

          {/* Panel 4: Data Validation Rules */}
          <div className="spec-panel">
            <h3 className="spec-panel-title">
              DATA VALIDATION RULES <span className="lcr-info-icon" title="Validation rules and error messages">ⓘ</span>
            </h3>

            <table className="spec-table">
              <thead>
                <tr>
                  <th className="spec-num-col">#</th>
                  <th>Rule</th>
                  <th>Rule Type</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {validationRules.map((rule) => (
                  <tr key={rule.rule}>
                    <td className="spec-num-col">{rule.num}</td>
                    <td style={{ fontWeight: 600, color: '#171717' }}>{rule.rule}</td>
                    <td style={{ color: '#50545b' }}>{rule.type}</td>
                    <td style={{ color: '#50545b' }}>{rule.msg}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="spec-panel-footer-btn"
              onClick={() => onMsg('Viewing all 14 validation rules...')}
            >
              View All Rules (14) &rarr;
            </button>
          </div>
        </div>

        {/* Right Rail Column */}
        <aside className="rail">
          {/* Card 1: Document Metadata */}
          <RailCard title="">
            <div className="lcr-rail-meta">
              <div><span>Screen No.</span><strong>GX1-S4</strong></div>
              <div><span>Asset / Artefact No.</span><strong>GX1-BRD-SPEC-004</strong></div>
              <div><span>Workflow Step</span><strong>4 of 8</strong></div>
              <div><span>Version</span><strong>1.0</strong></div>
              <div><span>Date</span><strong>20 Jul 2026</strong></div>
            </div>
          </RailCard>

          {/* Card 2: Screen Spec Summary */}
          <RailCard title="SCREEN SPEC SUMMARY">
            <div className="lcr-overview-list">
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <Table size={13} /> Total Fields
                </div>
                <span className="lcr-overview-val">18</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <Database size={13} /> Data Entities
                </div>
                <span className="lcr-overview-val">8</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <Layout size={13} /> UI Components
                </div>
                <span className="lcr-overview-val">26</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <ShieldCheck size={13} /> Validations
                </div>
                <span className="lcr-overview-val">14</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <FileText size={13} /> Business Rules
                </div>
                <span className="lcr-overview-val">12</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <Link2 size={13} /> API Endpoints
                </div>
                <span className="lcr-overview-val">6</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <CheckCircle2 size={13} className="lcr-check-icon" /> AI Confidence
                </div>
                <span className="lcr-overview-val" style={{ color: '#078541' }}>94%</span>
              </div>
            </div>
          </RailCard>

          {/* Card 3: Spec Quality Score */}
          <RailCard title="SPEC QUALITY SCORE">
            <div className="lcr-quickview-list">
              {[
                { name: 'Completeness', val: 92 },
                { name: 'Consistency', val: 95 },
                { name: 'Traceability', val: 93 },
                { name: 'Standards Compliance', val: 91 },
              ].map((item) => (
                <div key={item.name} className="lcr-quickview-row">
                  <span style={{ fontSize: '10px', color: '#50545b' }}>{item.name}</span>
                  <div className="lcr-confidence-cell" style={{ width: '100px' }}>
                    <div className="lcr-progress-bg">
                      <div className="lcr-progress-bar green" style={{ width: `${item.val}%` }} />
                    </div>
                    <span className="lcr-conf-val">{item.val}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="spec-score-box">
              <span>Overall Score</span>
              <span className="spec-score-val">94%</span>
            </div>
          </RailCard>

          {/* Card 4: Specification Actions */}
          <RailCard title="SPECIFICATION ACTIONS">
            <div className="spec-action-list">
              <a
                href="#check"
                className="spec-action-item"
                onClick={(e) => { e.preventDefault(); onMsg('Running completeness check...'); }}
              >
                <CheckCircle2 size={13} className="lcr-check-icon" /> Run Completeness Check
              </a>
              <a
                href="#standards"
                className="spec-action-item"
                onClick={(e) => { e.preventDefault(); onMsg('Checking UI component standards...'); }}
              >
                <Layout size={13} /> Check UI Component Standards
              </a>
              <a
                href="#relationships"
                className="spec-action-item"
                onClick={(e) => { e.preventDefault(); onMsg('Validating data relationships...'); }}
              >
                <Link2 size={13} /> Validate Data Relationships
              </a>
              <a
                href="#generate"
                className="spec-action-item"
                onClick={(e) => { e.preventDefault(); onMsg('Generating Specification Document...'); }}
              >
                <FileText size={13} /> Generate Spec Document
              </a>
              <a
                href="#json"
                className="spec-action-item"
                onClick={(e) => { e.preventDefault(); onMsg('Downloading Specification as JSON...'); }}
              >
                <Download size={13} /> Download as JSON
              </a>
            </div>
          </RailCard>
        </aside>
      </div>
    </>
  );
}
