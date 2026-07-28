'use client';

import { useState } from 'react';
import {
  ArrowRight, BarChart2, Calendar, Check, CheckCircle2, ChevronRight,
  Clock, ExternalLink, FileText, Grid, Info, Layers, Layout, List,
  Maximize2, RefreshCw, Sliders, Table, User, Users,
} from 'lucide-react';
import { RailCard } from '../components/shell';
import './lcr.css';

interface LayoutRecommendationWorkspaceProps {
  onMsg: (msg: string) => void;
  onNextStep: () => void;
}

export function LayoutRecommendationWorkspace({
  onMsg,
  onNextStep,
}: LayoutRecommendationWorkspaceProps) {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(1);

  const componentData = [
    { name: 'DataTable (Advanced)', usage: 'High', conf: 96, color: 'green' },
    { name: 'Multi Select Filter', usage: 'High', conf: 93, color: 'green' },
    { name: 'Status Badge', usage: 'High', conf: 92, color: 'green' },
    { name: 'Date Range Picker', usage: 'High', conf: 90, color: 'green' },
    { name: 'Tabs', usage: 'Medium', conf: 85, color: 'amber' },
    { name: 'Drawer (Right)', usage: 'Medium', conf: 83, color: 'amber' },
    { name: 'Modal (Form)', usage: 'Medium', conf: 82, color: 'amber' },
    { name: 'Timeline', usage: 'Low', conf: 60, color: 'red' },
  ];

  return (
    <>
      {/* ── Breadcrumb & Page Header Bar ──────────────────────────────────── */}
      <div className="lcr-breadcrumb">
        <span>Home</span>
        <ChevronRight size={12} />
        <span>BRD Pipeline</span>
        <ChevronRight size={12} />
        <span className="active">Layout &amp; Component Recommendation</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          Layout &amp; Component Recommendation
          <span className="lcr-header-badge">AI-Assisted</span>
        </h2>

        <div className="lcr-top-actions">
          <button className="lcr-action-btn" onClick={() => onMsg('Re-running AI Layout & Component analysis...')}>
            <RefreshCw size={13} /> Re-run AI
          </button>
          <button className="lcr-action-btn" onClick={() => onMsg('Comparing layout options...')}>
            <List size={13} /> Compare Options
          </button>
          <button className="lcr-next-btn" onClick={onNextStep}>
            Next Step <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <p className="lcr-subtitle-desc">
        AI recommends the optimal layout structure, UI pattern and reusable components based on normalised requirements and project context.
      </p>

      {/* ── Summary Card Banner ───────────────────────────────────────────── */}
      <div className="lcr-summary-card">
        <div className="lcr-summary-left">
          <div className="lcr-summary-icon">
            <Layout size={22} />
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
                strokeDasharray="91 9"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <span className="lcr-gauge-pct">91%</span>
          </div>

          <div className="lcr-ai-info">
            <strong>AI Confidence Score</strong>
            <p>High confidence layout and component match.</p>
            <a href="#rationale" onClick={(e) => { e.preventDefault(); onMsg('Viewing AI Rationale...'); }}>
              View AI rationale &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* ── Tabs Bar ──────────────────────────────────────────────────────── */}
      <div className="lcr-tabs-bar">
        {[
          '1. Layout Structure (Recommended)',
          '2. UI Pattern & Flow',
          '3. Component Library Suggestions',
          '4. Screen Map Preview',
          '5. Recommendation Summary',
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

      {/* ── Main Content Grid ─────────────────────────────────────────────── */}
      <div className="lcr-content-grid">
        {/* Left Area (Two Sub-Columns) */}
        <div className="lcr-workspace-columns">
          {/* Column 1: Layout Structures */}
          <div>
            <h3 className="lcr-column-title">
              RECOMMENDED LAYOUT STRUCTURES <span className="lcr-info-icon" title="Evaluated based on requirement complexity">ⓘ</span>
            </h3>

            {/* Option 1 */}
            <div
              className={`lcr-option-card ${selectedOption === 1 ? 'selected' : ''}`}
              onClick={() => setSelectedOption(1)}
              role="button"
              tabIndex={0}
            >
              <div className="lcr-option-radio">
                <div className="lcr-radio-dot" />
              </div>

              <div className="lcr-option-preview">
                <div className="lcr-preview-mock">
                  <div className="lcr-mock-sidebar" />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="lcr-mock-topbar" />
                    <div className="lcr-mock-body">
                      <div className="lcr-mock-block" style={{ height: '35%' }} />
                      <div className="lcr-mock-row">
                        <div className="lcr-mock-block" style={{ flex: 1 }} />
                        <div className="lcr-mock-block" style={{ flex: 1 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lcr-option-content">
                <div className="lcr-option-header">
                  <div className="lcr-option-title">
                    Option 1 (Recommended)
                    <span className="lcr-best-badge">Best Match</span>
                  </div>
                  <div className="lcr-fit-score">
                    <div className="lcr-fit-circle high">91%</div>
                    <span className="lcr-fit-label">AI Fit Score</span>
                  </div>
                </div>

                <ul className="lcr-option-bullets">
                  <li>Left Navigation + Top Header + Content Workspace</li>
                  <li>Best for data-heavy operational systems</li>
                  <li>High scalability and extensibility</li>
                  <li>Supports advanced filtering and dashboards</li>
                  <li>Responsive across all devices</li>
                </ul>

                <button
                  className="lcr-preview-link"
                  onClick={(e) => { e.stopPropagation(); onMsg('Opening Layout Option 1 preview...'); }}
                >
                  Preview &rarr;
                </button>
              </div>
            </div>

            {/* Option 2 */}
            <div
              className={`lcr-option-card ${selectedOption === 2 ? 'selected' : ''}`}
              onClick={() => setSelectedOption(2)}
              role="button"
              tabIndex={0}
            >
              <div className="lcr-option-radio">
                <div className="lcr-radio-dot" />
              </div>

              <div className="lcr-option-preview">
                <div className="lcr-preview-mock" style={{ flexDirection: 'column' }}>
                  <div className="lcr-mock-topbar" style={{ height: '22%' }} />
                  <div style={{ flex: 1, display: 'flex' }}>
                    <div className="lcr-mock-body" style={{ flex: 1 }}>
                      <div className="lcr-mock-block" />
                    </div>
                    <div className="lcr-mock-sidebar" style={{ width: '28%', background: '#cbd5e1' }} />
                  </div>
                </div>
              </div>

              <div className="lcr-option-content">
                <div className="lcr-option-header">
                  <div className="lcr-option-title">Option 2</div>
                  <div className="lcr-fit-score">
                    <div className="lcr-fit-circle medium">72%</div>
                    <span className="lcr-fit-label">AI Fit Score</span>
                  </div>
                </div>

                <ul className="lcr-option-bullets">
                  <li>Top Navigation + Side Filter Panel</li>
                  <li>Good for simple to medium complexity</li>
                  <li>Faster access to key functions</li>
                  <li>Suitable for task-centric modules</li>
                </ul>

                <button
                  className="lcr-preview-link"
                  onClick={(e) => { e.stopPropagation(); onMsg('Opening Layout Option 2 preview...'); }}
                >
                  Preview &rarr;
                </button>
              </div>
            </div>

            {/* Option 3 */}
            <div
              className={`lcr-option-card ${selectedOption === 3 ? 'selected' : ''}`}
              onClick={() => setSelectedOption(3)}
              role="button"
              tabIndex={0}
            >
              <div className="lcr-option-radio">
                <div className="lcr-radio-dot" />
              </div>

              <div className="lcr-option-preview">
                <div className="lcr-preview-mock" style={{ flexDirection: 'column' }}>
                  <div className="lcr-mock-topbar" style={{ height: '22%' }} />
                  <div className="lcr-mock-body">
                    <div className="lcr-mock-block" style={{ height: '20%' }} />
                    <div className="lcr-mock-block" />
                  </div>
                </div>
              </div>

              <div className="lcr-option-content">
                <div className="lcr-option-header">
                  <div className="lcr-option-title">Option 3</div>
                  <div className="lcr-fit-score">
                    <div className="lcr-fit-circle low">48%</div>
                    <span className="lcr-fit-label">AI Fit Score</span>
                  </div>
                </div>

                <ul className="lcr-option-bullets">
                  <li>Compact Top Navigation + Tabbed Workspace</li>
                  <li>Good for lightweight modules</li>
                  <li>Limited scalability for large datasets</li>
                  <li>Not ideal for complex dashboards</li>
                </ul>

                <button
                  className="lcr-preview-link"
                  onClick={(e) => { e.stopPropagation(); onMsg('Opening Layout Option 3 preview...'); }}
                >
                  Preview &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Top Component Recommendations */}
          <div>
            <h3 className="lcr-column-title">
              TOP COMPONENT RECOMMENDATIONS <span className="lcr-info-icon" title="Recommended component primitives">ⓘ</span>
            </h3>

            <div className="lcr-comp-card">
              <table className="lcr-comp-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Usage</th>
                    <th>AI Confidence</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {componentData.map((comp) => (
                    <tr key={comp.name}>
                      <td>
                        <div className="lcr-comp-name">
                          <Grid size={12} className="lcr-comp-icon" />
                          {comp.name}
                        </div>
                      </td>
                      <td>
                        <span className="lcr-usage-pill">{comp.usage}</span>
                      </td>
                      <td>
                        <div className="lcr-confidence-cell">
                          <div className="lcr-progress-bg">
                            <div className={`lcr-progress-bar ${comp.color}`} style={{ width: `${comp.conf}%` }} />
                          </div>
                          <span className="lcr-conf-val">{comp.conf}%</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <a
                          href="#view"
                          className="lcr-action-link"
                          onClick={(e) => { e.preventDefault(); onMsg(`Inspecting ${comp.name} specifications...`); }}
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="lcr-view-all-comps" onClick={() => onMsg('Loading full component library...')}>
                View Full Component Library &rarr;
              </button>
            </div>

            {/* AI Rationale Card */}
            <div className="lcr-rationale-card" id="rationale">
              <div className="lcr-rationale-title">
                AI RATIONALE <span className="lcr-rationale-sub">(Why this layout is recommended)</span>
              </div>

              <p className="lcr-rationale-text">
                The BRD contains high-volume task data, multiple entities, assignments, approvals and tracking requirements.
                A left navigation with a top header provides the best information architecture, scalability and user efficiency.
                It supports advanced tables, filters, dashboards and future modules with minimal rework.
              </p>

              <a
                href="#analysis"
                className="lcr-rationale-link"
                onClick={(e) => { e.preventDefault(); onMsg('Opening detailed AI rationale analysis...'); }}
              >
                View Detailed AI Analysis &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Right Context Rail */}
        <aside className="rail">
          {/* Card 1: Document Metadata */}
          <RailCard title="">
            <div className="lcr-rail-meta">
              <div><span>Screen No.</span><strong>GX1-S3</strong></div>
              <div><span>Asset / Artefact No.</span><strong>GX1-BRD-LCR-001</strong></div>
              <div><span>Workflow Step</span><strong>3 of 8</strong></div>
              <div><span>Version</span><strong>1.0</strong></div>
              <div><span>Date</span><strong>20 Jul 2026</strong></div>
            </div>
          </RailCard>

          {/* Card 2: Requirement Overview */}
          <RailCard title="REQUIREMENT OVERVIEW">
            <div className="lcr-overview-list">
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <FileText size={13} /> Total Functional Requirements
                </div>
                <span className="lcr-overview-val">24</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <FileText size={13} /> Total Non-Functional Requirements
                </div>
                <span className="lcr-overview-val">12</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <Users size={13} /> Users / Roles
                </div>
                <span className="lcr-overview-val">9</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <Layers size={13} /> Data Entities
                </div>
                <span className="lcr-overview-val">14</span>
              </div>
              <div className="lcr-overview-row">
                <div className="lcr-overview-left">
                  <Layout size={13} /> Screens / Modules (Est.)
                </div>
                <span className="lcr-overview-val">11</span>
              </div>
            </div>
          </RailCard>

          {/* Card 3: Recommendation Quick View */}
          <RailCard title="RECOMMENDATION QUICK VIEW">
            <div className="lcr-quickview-list">
              <div className="lcr-quickview-row">
                <div className="lcr-quickview-left">
                  <CheckCircle2 size={13} className="lcr-check-icon" /> Recommended Layout
                </div>
                <strong style={{ color: '#078541', fontSize: '10.5px' }}>Option 1</strong>
              </div>
              <div className="lcr-quickview-row">
                <div className="lcr-quickview-left">
                  <CheckCircle2 size={13} className="lcr-check-icon" /> AI Confidence Score
                </div>
                <strong>91%</strong>
              </div>
              <div className="lcr-quickview-row">
                <div className="lcr-quickview-left">
                  <Grid size={13} /> Reusable Components
                </div>
                <strong>18</strong>
              </div>
              <div className="lcr-quickview-row">
                <div className="lcr-quickview-left">
                  <Layers size={13} /> New Components
                </div>
                <strong>3</strong>
              </div>
              <div className="lcr-quickview-row">
                <div className="lcr-quickview-left">
                  <Layout size={13} /> Estimated Screens
                </div>
                <strong>11</strong>
              </div>
              <div className="lcr-quickview-row">
                <div className="lcr-quickview-left">
                  <Clock size={13} /> Est. Development Effort
                </div>
                <span className="lcr-badge-purple">Medium</span>
              </div>
            </div>
          </RailCard>

          {/* Card 4: Next Steps */}
          <RailCard title="NEXT STEPS">
            <div className="lcr-nextstep-list">
              <div className="lcr-nextstep-item">
                <CheckCircle2 size={13} className="lcr-check-icon" /> Confirm layout structure
              </div>
              <div className="lcr-nextstep-item">
                <CheckCircle2 size={13} className="lcr-check-icon" /> Review and finalise components
              </div>
              <div className="lcr-nextstep-item">
                <CheckCircle2 size={13} className="lcr-check-icon" /> Proceed to Screen Specification
              </div>
            </div>

            <button
              className="lcr-confirm-btn"
              onClick={() => {
                onMsg('Layout & Component recommendations confirmed!');
                onNextStep();
              }}
            >
              Confirm &amp; Continue &rarr;
            </button>
          </RailCard>

          {/* Card 5: Help & Guidance */}
          <RailCard title="HELP &amp; GUIDANCE">
            <div className="lcr-help-list">
              {[
                'How layout recommendation works',
                'Component library guidelines',
                'UI pattern best practices',
                'GX1 design system reference',
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
                  className="lcr-help-item"
                  onClick={(e) => { e.preventDefault(); onMsg(`Opening documentation: ${item}...`); }}
                >
                  • &nbsp;{item}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </RailCard>
        </aside>
      </div>
    </>
  );
}
