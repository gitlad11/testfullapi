import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import Apolloclient from '../handlers/apollo-client'

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={Apolloclient}> 
    <Component {...pageProps} /> 
    </ApolloProvider>
}

export default MyApp
