"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000, // 1 minute
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
