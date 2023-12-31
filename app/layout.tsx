import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hydrate from "./components/Hydrate";
import { Providers } from "./Redux/Provider";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "500"],
  variable: "--font-inter",
});

export const metadata = {
  title: "MOO MOO BAKED",
  description: "Premium ice cream",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans min-h-[calc(100vh-100px)] mx-auto`}
    >
      <Hydrate>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </Hydrate>
    </html>
  );
}
