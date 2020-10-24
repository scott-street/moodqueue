import * as Sentry from "@sentry/browser"

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
        enabled: true, //process.env.NODE_ENV === 'production',
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    })
}

export default function App({ Component, pageProps, err }) {
    return <Component {...pageProps} err={err} />
}
