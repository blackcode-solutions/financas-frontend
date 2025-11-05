import { DashboardComponent } from "@/layout/Dashboard";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardComponent>{children}</DashboardComponent>
  );
}
