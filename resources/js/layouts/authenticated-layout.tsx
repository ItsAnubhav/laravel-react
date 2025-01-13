import { PropsWithChildren, ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import AppearanceDropdown from "@/components/appearance-dropdown";
import { useTheme } from "next-themes";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Toaster } from "@/components/ui/toaster";

export default function AuthenticatedLayout({
    header,
    children
}: PropsWithChildren<{
    header?: ReactNode;
}>) {
    const { setTheme } = useTheme()
    const { auth } = usePage<PageProps>().props;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{header}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="flex-1" />

                    <div className="mr-2">
                        <AppearanceDropdown></AppearanceDropdown>
                    </div>


                </header>
                <main className="p-4 md:pt-0 h-full">
                    {children}
                </main>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    );
}
