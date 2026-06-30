"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { LayoutDashboardIcon, UsersIcon, CommandIcon } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return null;
  }
  const user = session?.user;

  const data = {
    user: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
    navMain: [
      {
        title: "Projets",
        icon: <LayoutDashboardIcon />,
        items: [
          {
            title: "List",
            url: "/admin/dashboard/project",
          },
          {
            title: "Créer",
            url: "/admin/dashboard/project/create",
          },
        ],
      },
      {
        title: "Users",
        url: "/admin/dashboard/users",
        icon: <UsersIcon />,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <CommandIcon className="size-5!" />
        <span className="text-base font-semibold">Portfolio</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
