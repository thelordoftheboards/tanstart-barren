import { z } from 'zod';

export const GlobalClientSettingsSchema = z.object({
  mapMaptilerApiKeyClient: z.string(),
});

export type GlobalClientSettingsType = z.infer<typeof GlobalClientSettingsSchema>;
