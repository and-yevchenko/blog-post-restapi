import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import React from "react"

interface DialogWindowProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: React.ReactNode
    title: string
}

export const DialogWindow: React.FC<DialogWindowProps> = ({ title, children, open, setOpen }) => {

    return (
        <Dialog
                open={open as boolean}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle>{title}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] })}
                >
                    <Close />
                </IconButton>
                <DialogContent>
                    { children }
                </DialogContent>
            </Dialog>
    )
}