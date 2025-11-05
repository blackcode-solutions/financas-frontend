"use client";
import { usePathname, useRouter } from "next/navigation";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const asPath = usePathname();
  const router = useRouter();
  const token = Cookies.get("tokenEfinancas");

  // useEffect(() => {
  //   if (
  //     !token &&
  //     asPath !== "/" &&
  //     asPath !== "/cadastroEmpresa" &&
  //     asPath !== "/redefinirSenha"
  //   )
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 200);

  //   if (token && asPath === "/") router.push("/vendas");
  // }, [asPath]);

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        mutations: {
          retry: 2,
        },
        queries: {
          retry: 2,
          refetchOnReconnect: "always",
          refetchOnWindowFocus: true,
          refetchOnMount: "always",
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {!token && asPath !== "/" && asPath !== "/cadastroEmpresa" && asPath !== "/redefinirSenha" ?  <html><body></body></html> :  children} */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
