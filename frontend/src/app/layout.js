import Header from "@/components/header/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { AppProvider, useGlobalAppContext } from "@/context/context";
import { AuthContextProvider } from "@/context/authContext";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import NextAuthProvider from "@/context/sessionContext";
import Loading from "./loading";

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
      <body className={`${roboto.className}`} suppressHydrationWarning={true}>

        <NextAuthProvider>
          <AppProvider>
            <AuthContextProvider>
              <main className="">
                <Suspense fallback={<Loading />}>
                  <Header />
                  <div className=" bg-gray-50 min-h-[calc(100vh-1.25rem)] mx-16 py-10 my-10 px-10 print:p-0 print:m-0">
                    {children}
                  </div>
                  <Footer />
                </Suspense>
              </main>
            </AuthContextProvider>
          </AppProvider>
        </NextAuthProvider>
        <ToastContainer />

      </body>
    </html>
  );
}
