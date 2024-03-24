import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const deviceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  title: z.string().optional(),
  label: z.string().optional(),
  priority: z.string().optional(),
});

export type Task = z.infer<typeof deviceSchema>;
