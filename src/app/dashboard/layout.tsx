import DashboardSidebar from "@/components/shared/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
        <DashboardSidebar />
      <main className="flex-1 overflow-auto ml-60">{children}</main>
    </div>
  );
}
