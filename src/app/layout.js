import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/shared/NavBar";
import Footer from "@/shared/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitVerse",
  description: "Your Universe of Fitness",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomNavbar></CustomNavbar>
        {children}
         <ToastContainer />
        <Footer></Footer>
        </body>
    </html>
  );
}
