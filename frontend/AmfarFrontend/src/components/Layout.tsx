import React from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-amfar-grayBg font-sans">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
