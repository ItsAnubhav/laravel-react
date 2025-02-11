import { Row, Table } from "@tanstack/react-table"
import { Check, CheckCheck, PanelTopInactive, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

// import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { statuses, userTypes } from "@/pages/users/data/userdata";

interface DataTableToolbarProps<TData> {
    searchTitle?: string
    table: Table<TData>
    onBulkDelete?: (ids: Row<TData>[]) => void
}

export function DataTableToolbar<TData>({
    searchTitle = "Search here...",
    table,
    onBulkDelete

}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const selectedRows = table.getSelectedRowModel().rows

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder={searchTitle}
                    value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("fullName")?.setFilterValue(event.target.value)
                    }
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                {table.getColumn("role") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("role")}
                        title="Role"
                        options={userTypes}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
                {selectedRows.length > 0 && onBulkDelete && (
                    <Button className="h-8 px-2 lg:px-3" onClick={() => onBulkDelete(selectedRows)} variant="ghost">Delete Selected</Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
