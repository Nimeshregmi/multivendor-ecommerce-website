"use client";
import { QueryClient, QueryClientProvider ,isServer} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const WrapReactQuary = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [client] = useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom"
        buttonPosition="bottom-right"
      />
      {children}
    </QueryClientProvider>
  );
};

export default WrapReactQuary;
