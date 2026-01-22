import { globalClientSettings } from '~/base-config/server/global-client-settings-all-parts';
//import { getOrganizationId } from '~/base-nav-and-auth/server/get-organization-id';

// biome-ignore lint/suspicious/useAwait: In most realistic scenarious it would make sense for it to be async
export async function handlerGetGlobalClientSettings() {
  //const _organizationId = await getOrganizationId();

  return Response.json(globalClientSettings);
}
