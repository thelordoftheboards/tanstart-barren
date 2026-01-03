import { TanStackDevtools } from '@tanstack/react-devtools';
import { FormDevtoolsPanel } from '@tanstack/react-form-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

export default function TanstackDevTools() {
  return (
    <TanStackDevtools
      plugins={[
        {
          name: 'TSt Query',
          render: <ReactQueryDevtoolsPanel />,
        },
        {
          name: 'TSt Router',
          render: <TanStackRouterDevtoolsPanel />,
        },
        {
          name: 'TSt Forms',
          render: <FormDevtoolsPanel />,
        },
      ]}
    />
  );
}
