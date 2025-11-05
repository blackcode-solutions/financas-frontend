import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community";
import "sweetalert2/src/sweetalert2.scss";
import "./globals.css";
import ReactQueryProvider from "@/Provider";
import "rsuite/Calendar/styles/index.css";
import { CustomProvider } from "rsuite";
import { ptBR } from "rsuite/esm/locales";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "E-Barber",
  description: "Aplicação de Gestão de Barbearias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <PrimeReactProvider>
        <CustomProvider locale={ptBR}>
          <html lang="pt-br" style={{ margin: "0rem" }}>
            <body className={roboto.className} style={{ margin: "0rem",background:'#f5f7fa' }}>
              {children}
            </body>
          </html>
        </CustomProvider>
      </PrimeReactProvider>
    </ReactQueryProvider>
  );
}
