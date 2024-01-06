import Header from "@/components/header/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { AppProvider, useGlobalAppContext } from "@/context/context";
import { AuthContextProvider } from "@/context/authContext";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/utils/loader/Loader";
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "@/context/sessionContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700"],
});

export const metadata = {
  title: "Resume Builder",
  description: "resume Builder Created by kishor sarkar",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body
        className={`${roboto.className}`}
        suppressHydrationWarning={true}
      >

        <Suspense fallback={<Loader />}>
          <NextAuthProvider>
            <AppProvider>
              <AuthContextProvider>
                <main>
                  <Header />
                  <div className=" bg-slate-50 min-h-[calc(100vh-1.25rem)]">
                    {children}
                  </div>
                  <Footer />
                </main></AuthContextProvider></AppProvider>
          </NextAuthProvider>
          <ToastContainer />
        </Suspense>

      </body>

    </html>


  );
}
