"use client";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Layout, LayoutHeader } from "./layout";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { bottomSidelinks, sidelinks } from "@/lib/constants/admin-sidelinks";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  defaultSize: number | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function Sidebar({
  className,
  defaultSize,
  defaultCollapsed = false,
  navCollapsedSize,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <aside
      className={cn(
        `sticky top-0 z-50 w-full transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? "md:w-14" : "md:w-64 md:min-w-64"
        }`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
        } w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className="sticky top-0 justify-between px-4 py-3 pt-5 bg-white md:px-4">
          <div
            className={`flex flex-col bg-white ${!isCollapsed ? "gap-2" : ""}`}
          >
            <Icons.logoWord className="h-12" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </LayoutHeader>
        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`h-full flex-1 bg-white overflow-auto ${
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
          bottomLinks={bottomSidelinks}
        />
      </Layout>
    </aside>
  );
}
