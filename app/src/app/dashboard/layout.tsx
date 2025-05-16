import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Layout, LayoutBody } from "./_components/layout";
import { AdminPageNav } from "./_components/admin-sections";
import Sidebar from "./_components/sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const token = getToken();
  // if (!token) {
  //  redirect("/admin/login");
  // }
  const layoutCookie = [265, 440, 655];
  const collapsedCookie = false;

  const layout = layoutCookie ? layoutCookie : [265, 440, 655];
  const collapsed = collapsedCookie ? collapsedCookie : undefined;

  return (
    <div className="relative flex flex-col md:flex-row h-full bg-background">
      <Sidebar
        defaultSize={layout[0]}
        navCollapsedSize={4}
        defaultCollapsed={collapsed}
      />
      <main
        id="content"
        className={
          "overflow-x-hidden px-0 flex-1 transition-[margin] md:overflow-y-hidden md:pt-0 h-full"
        }
      >
        <Layout className="min-h-screen h-full">
          {/* ===== Top Heading ===== */}
          <AdminPageNav />

          {/* ===== Content ===== */}
          <LayoutBody className="flex flex-col bg-[#F2F2F2] h-full">
            {children}
          </LayoutBody>
        </Layout>
      </main>
    </div>
  );
}
