import { queryOptions } from '@tanstack/react-query';
import { queryFnGet } from '~/base-nav-and-auth/client/query-fn-get';
import { type GlobalClientSettingsType } from '../schema/global-client-settings';

export const queryOptionsGlobalClientSettings = () =>
  queryOptions({
    queryKey: ['globa-client-settings'],
    queryFn: () => queryFnGet<GlobalClientSettingsType>('/api/v1/system/global-client-settings'),
  });
