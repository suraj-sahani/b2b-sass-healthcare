import { AppSidebar } from "@/components/app-sidebar";
import AuthProvider from "@/components/providers/auth-provider";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
