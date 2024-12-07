import { ClerkProvider } from "@clerk/nextjs";
import  {Inter, Montserrat } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';



const inter = Montserrat({subsets: ["latin"]});
export const metadata = {
  title: "Split-Bills",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/**/}
        
          {children}
          
          <ToastContainer richColors theme="colored" position="top-right"  />
        </body>
      </html>
    </ClerkProvider>
  );
}
