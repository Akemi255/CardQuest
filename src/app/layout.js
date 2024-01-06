import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Card Quest",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider localization={esES}>
     <html lang="es"  translate="no">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
