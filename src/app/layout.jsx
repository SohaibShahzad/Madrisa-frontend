"use client";

import ContextProvider from "@/contexts/contextProvider";
import { AuthProvider } from "@/contexts/auth";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainLayout from "@/components/layouts/MainLayout";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LMS | Learning Management System",
  description: "Madrissa Learning Management System",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminDash = pathname.startsWith("/admin/dashboard");

  const Layout = isAdminDash ? DashboardLayout : MainLayout;

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ContextProvider>
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
