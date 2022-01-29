//----------------------------------------------------------- DEPENDENCIES //
// 2. MUI 
import { ThemeProvider } from "@mui/material";
import theme from "../MUI";

// 3. Context
import { AuthProvider } from "../contexts/AuthContext";

// COMPONENTS
import Navbar from "../components/Navbar";

// Global CSS
import "../styles/globals.css";


//----------------------------------------------------------- MAIN FUNCTION //
function MyApp({ Component, pageProps }) {
  //----------------------------------------------------------- RENDER //
  return <>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  </>
}

//----------------------------------------------------------- EXPORT //
export default MyApp
