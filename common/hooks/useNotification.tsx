import React from "react"
import { SnackbarProvider, useSnackbar } from "notistack"

export interface NotificationContextValue {
    notifySuccess: (param: string) => void
    notifyError: (param: string) => void
}

export const NotificationContext = React.createContext<NotificationContextValue>({
    notifySuccess: () => {},
    notifyError: () => {},
})

interface NotificationProviderProps {
    value?: NotificationContextValue
    children: React.ReactNode
}

const BaseNotificationProvider: React.FunctionComponent<NotificationProviderProps> = (props) => {
    const { enqueueSnackbar } = useSnackbar()

    const notifySuccess = (message: string) => {
        enqueueSnackbar(message, { variant: "success" })
    }

    const notifyError = (message: string) => {
        enqueueSnackbar(message, { variant: "error" })
    }

    const notificationContextValue = {
        notifySuccess,
        notifyError,
    }

    return (
        <NotificationContext.Provider value={props.value ?? notificationContextValue} {...props} />
    )
}

export const NotificationProvider = (props: NotificationProviderProps) => (
    <SnackbarProvider>
        <BaseNotificationProvider {...props} />
    </SnackbarProvider>
)

export const useNotification = () => {
    const context = React.useContext(NotificationContext)
    if (!context) throw new Error("useNotification must be used within a NotificationProvider")
    return context
}
