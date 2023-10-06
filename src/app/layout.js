import Header from "@/components/header/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { AppProvider, useGlobalAppContext } from "@/context/context";
import { AuthContextProvider } from "@/context/authContext";

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
    <AppProvider>
      <AuthContextProvider>
        <html lang="en">
          <body className={roboto.className}>
            <Header />
            <div className=" bg-slate-50 min-h-screen">{children}</div>
            <Footer />
          </body>
        </html>
      </AuthContextProvider>
    </AppProvider>
  );
}
