import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flash Wiz",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" min-h-screen">
      <body className={inter.className}>
        <AuthContextProvider>
          <div className=" min-h-screen flex flex-col">
            <Header />
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
