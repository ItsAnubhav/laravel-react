import {
    ColumnDef,
} from "@tanstack/react-table"
import { BadgeCheck, DeleteIcon, EditIcon, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthenticatedLayout from "@/layouts/authenticated-layout";

import { User } from "@/types"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { DataTable } from "@/components/app-datatable"
import { Head, Link } from "@inertiajs/react"

// Define the columns
export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "first_name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original
            return (<div className="capitalize">{user.first_name} {user.last_name}</div>)
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Email" />
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "date_of_birth",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="DOB" />
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("date_of_birth")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const rowData = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link href={route('users.edit', rowData.id)}>
                                <EditIcon />
                                Edit Profile
                            </Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

export default function Index(
    { users }: { users: User[] }
) {
    return (
        <AuthenticatedLayout header={'Users'} >
            <Head title="Users" />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Users</h1>
                <DataTable columns={columns} data={users} />
            </div>
        </AuthenticatedLayout>
    )
}
