import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.number().int(), project_name: z.string(), project_code: z.string(), customer: z.string(),
  currency_name: z.string(), start_date: z.string(), target_end_date: z.string(), project_status: z.string(),
  project_type: z.string(), business_domain: z.string(), sub_domain: z.string(), last_updated: z.string(),
  updated_by: z.string(), budget: z.string(), priority: z.string(), contract_reference: z.string(), manager: z.string(),
});

export const ProjectListResponseSchema = z.object({
  data: z.object({ code: z.string(), project_list: z.array(ProjectSchema) }),
  timestamp: z.string(), status_code: z.number(), message: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectListResponse = z.infer<typeof ProjectListResponseSchema>;
