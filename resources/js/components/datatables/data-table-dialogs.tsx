import { toast } from "@/hooks/use-toast"
import { ConfirmDialog } from "../dialogs/confirm-dialog"
import { useDataTable } from "./datatable-context"

export function DataTableDialogs() {
    const { open, setOpen, currentRow, setCurrentRow, selectedRows, setSelectedRows } = useDataTable()
    const modelName = 'task'
    return (
        <>
            {selectedRows.length > 0 && (
                <>
                    <ConfirmDialog
                        key='bulk-delete'
                        destructive
                        open={open === 'bulk-delete'}
                        onOpenChange={() => {
                            setOpen('bulk-delete')
                            setTimeout(() => {
                                setSelectedRows([])
                            }, 500)
                        }}
                        handleConfirm={() => {
                            setOpen(null)
                            setTimeout(() => {
                                setSelectedRows([])
                            }, 500)
                            toast({
                                title: `The following ${selectedRows.length} ${modelName}s have been deleted:`,
                                description: (
                                    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                                        <code className='text-white'>
                                            {JSON.stringify(selectedRows, null, 2)}
                                        </code>
                                    </pre>
                                ),
                            })
                        }}
                        className='max-w-md'
                        title={`Delete these ${selectedRows.length} ${modelName}s?`}
                        desc={
                            <>
                                You are about to delete{' '}
                                <strong>{selectedRows.length}</strong> {modelName}s. <br />
                                This action cannot be undone.
                            </>
                        }
                        confirmText='Delete'
                    />
                </>
            )}
            {currentRow && (
                <>
                    <ConfirmDialog
                        key='delete'
                        destructive
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete')
                            setTimeout(() => {
                                setCurrentRow(null)
                            }, 500)
                        }}
                        handleConfirm={() => {
                            setOpen(null)
                            setTimeout(() => {
                                setCurrentRow(null)
                            }, 500)
                            toast({
                                title: `The following ${modelName} has been deleted:`,
                                description: (
                                    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                                        <code className='text-white'>
                                            {JSON.stringify(currentRow, null, 2)}
                                        </code>
                                    </pre>
                                ),
                            })
                        }}
                        className='max-w-md'
                        title={`Delete this ${modelName}: ${currentRow} ?`}
                        desc={
                            <>
                                You are about to delete a task with the ID{' '}
                                <strong></strong>. <br />
                                This action cannot be undone.
                            </>
                        }
                        confirmText='Delete'
                    />
                </>
            )}
        </>
    )
}