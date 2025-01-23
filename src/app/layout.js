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
 
      <html lang="en">
        <body className={inter.className}>
          {/**/}
          <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
          {children}
          
          <ToastContainer richColors theme="colored" position="top-right"  />
        </body>
      </html>
  );
}
