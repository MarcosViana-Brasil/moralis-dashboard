import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'

const appId = process.env.NEXT_PUBLIC_APPID
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <MoralisProvider appId={appId} serverUrl={serverUrl}>
                <Component {...pageProps} />
            </MoralisProvider>
        </ChakraProvider>
    )
}

export default MyApp
