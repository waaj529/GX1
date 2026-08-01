'use client';
import { FileText, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ProjectListResponseSchema, type Project } from '../lib/gsolve';

type LoadState = 'loading' | 'error' | 'success';
export function ProjectSelection({ onMessage }: { onMessage: (message: string) => void }) {
  const [projects, setProjects] = useState<Project[]>([]); const [selectedId, setSelectedId] = useState<number | null>(null);
  const [state, setState] = useState<LoadState>('loading'); const [error, setError] = useState('');
  const loadProjects = useCallback(async (force = false) => {
    setState('loading'); setError('');
    try {
      const response = await fetch(`/api/projects${force ? '?refresh=1' : ''}`, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      const raw: unknown = await response.json();
      if (!response.ok) throw new Error('message' in (raw as Record<string, unknown>) ? String((raw as { message: unknown }).message) : 'Unable to load projects.');
      const parsed = ProjectListResponseSchema.safeParse(raw);
      if (!parsed.success || parsed.data.status_code !== 200 || parsed.data.data.code !== '001') throw new Error('Project data could not be verified. Please try again.');
      const list = parsed.data.data.project_list;
      setProjects(list); setSelectedId(current => list.some(project => project.id === current) ? current : (list[0]?.id ?? null)); setState('success');
      if (force) onMessage('Project details refreshed from GSolve.');
    } catch (cause) { setState('error'); setError(cause instanceof Error ? cause.message : 'Unable to load projects.'); }
  }, [onMessage]);
  useEffect(() => { void loadProjects(); }, [loadProjects]);
  const project = projects.find(item => item.id === selectedId); const refresh = () => { void loadProjects(true); };
  return <section className="form-card section project">
    <h3>1. &nbsp; PROJECT SELECTION <small>(From GSolve)</small></h3>
    <button className="refresh" type="button" onClick={refresh} disabled={state === 'loading'}><RefreshCw className={state === 'loading' ? 'spin' : ''} size={15} /> {state === 'loading' ? 'Loading…' : 'Refresh from GSolve'}</button>
    {state === 'loading' && <p className="project-feedback" role="status">Loading projects from GSolve…</p>}
    {state === 'error' && <div className="project-error" role="alert">{error}<button type="button" onClick={refresh}>Try again</button></div>}
    {state === 'success' && projects.length === 0 && <p className="project-feedback">No GSolve projects are available.</p>}
    {state === 'success' && project && <>
      <label>Select GSolve Project <b className="required">*</b></label>
      <select value={String(project.id)} onChange={event => setSelectedId(Number(event.target.value))}>{projects.map(item => <option key={item.id} value={item.id}>{item.project_code} | {item.project_name}</option>)}</select>
      <div className="summary"><div className="project-icon"><FileText size={18} /></div><ProjectMeta label="Project Code" value={project.project_code} /><ProjectMeta label="Project Name" value={project.project_name} /><ProjectMeta label="Client" value={project.customer} /><ProjectMeta label="Project Manager" value={project.manager} /><div className="meta"><span>Status</span><strong className="status">{project.project_status}</strong></div></div>
      <p className="metadata-title">Project Metadata (Read-only from GSolve)</p>
      <div className="metadata"><ProjectMeta label="Start Date" value={project.start_date} /><ProjectMeta label="Target End Date" value={project.target_end_date} /><ProjectMeta label="Currency" value={project.currency_name} /><ProjectMeta label="Project Type" value={project.project_type} /><ProjectMeta label="Business Domain" value={project.business_domain} /><ProjectMeta label="Sub Domain" value={project.sub_domain} /><ProjectMeta label="Contract Reference" value={project.contract_reference} /><ProjectMeta label={`Budget (${project.currency_name})`} value={project.budget} /><ProjectMeta label="Project Priority" value={project.priority} /><ProjectMeta label="Last Updated" value={project.last_updated} /><ProjectMeta label="Updated By" value={project.updated_by} /></div>
    </>}
  </section>;
}
function ProjectMeta({ label, value }: { label: string; value: string }) { return <div className="meta"><span>{label}</span><strong>{value}</strong></div>; }
