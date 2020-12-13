import React from "react"
import { SnackbarProvider, useSnackbar } from "notistack"

export interface NotificationContextValue {
    notifySuccess: (param: string, position?: any) => void
    notifyError: (param: string) => void
    notifyInfo: (param: string) => void
}

export const NotificationContext = React.createContext<NotificationContextValue>({
    notifySuccess: () => {},
    notifyError: () => {},
    notifyInfo: () => {},
})

interface NotificationProviderProps {
    value?: NotificationContextValue
    children: React.ReactNode
}

const BaseNotificationProvider: React.FunctionComponent<NotificationProviderProps> = (props) => {
    const { enqueueSnackbar } = useSnackbar()

    const notifySuccess = (message: string, position?: any) => {
        enqueueSnackbar(message, {
            variant: "success",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: position === undefined ? "center" : position,
            },
        })
    }

    const notifyError = (message: string) => {
        enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
        })
    }

    const notifyInfo = (message: string) => {
        enqueueSnackbar(message, {
            variant: "info",
            anchorOrigin: { vertical: "top", horizontal: "center" },
        })
    }

    const notificationContextValue = {
        notifySuccess,
        notifyError,
        notifyInfo,
    }

    return (
        <NotificationContext.Provider value={props.value ?? notificationContextValue} {...props} />
    )
}

export const NotificationProvider = (props: NotificationProviderProps) => (
    <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        preventDuplicate
        autoHideDuration={4000}
    >
        <BaseNotificationProvider {...props} />
    </SnackbarProvider>
)

export const useNotification = () => {
    const context = React.useContext(NotificationContext)
    if (!context) throw new Error("useNotification must be used within a NotificationProvider")
    return context
}
