import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type DataTableDialogType = 'invite' | 'add' | 'edit' | 'delete' | 'import' | 'export' | 'bulk-delete'

interface DataTableContextType<T> {
    open: DataTableDialogType | null
    setOpen: (str: DataTableDialogType | null) => void
    currentRow: T | null
    setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>
    selectedRows: T[]
    setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>
}

const DataTableContext = React.createContext<DataTableContextType<any> | null>(null)

interface Props<T> {
    children: React.ReactNode
}

export default function DataTableProvider<T>({ children }: Props<T>) {
    const [open, setOpen] = useDialogState<DataTableDialogType>(null)
    const [currentRow, setCurrentRow] = useState<T | null>(null)
    const [selectedRows, setSelectedRows] = useState<T[]>([])

    return (
        <DataTableContext.Provider value={{ open, setOpen, currentRow, setCurrentRow, selectedRows, setSelectedRows }}>
            {children}
        </DataTableContext.Provider>
    )
}

export const useDataTable = <T,>() => {
    const context = React.useContext(DataTableContext)

    if (!context) {
        throw new Error('useDataTable must be used within a DataTableProvider')
    }

    return context as DataTableContextType<T>
}