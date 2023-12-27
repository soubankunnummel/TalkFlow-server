import { Inter } from "next/font/google"; 
import "./globals.css";
// import StoreProvider from "./Redux/store/storeProvider";


const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const inter = Inter({ subsets: ["latin"] }); 

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  // 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  // "Cross-Origin-Opener-Policy": "restrict-properties"
  // "Cross-Origin-Embedder-Policy": "require-corp",
};

export default function RootLayout({ children }) {
  return (
    <>
    {/* <StoreProvider> */}
        <html lang="en">
          <body className={inter.className}>
            
            {children}
            </body>
        </html>
        {/* </StoreProvider> */}
    </>
  );
}
