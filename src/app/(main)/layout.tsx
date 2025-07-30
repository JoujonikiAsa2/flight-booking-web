import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ReduxProvider from "@/redux/provider/ReduxProvider";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div
        className="bg-secondary min-h-screen flex flex-col"
      >
        <ReduxProvider>
          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </div>
  );
}
