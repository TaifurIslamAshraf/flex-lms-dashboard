import { cn } from "@/lib/utils";
import ReduxProvider from "@/redux/reduxProvider";
import AuthProvider from "@/utilities/SessionProvider";
import type { Metadata } from "next";
import {
  Hind_Siliguri,
  Noto_Sans_Bengali as Noto,
  Poppins,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { styles } from "./styles";

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const bangli = Noto({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto",
});
const hind_siliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-siliguri",
});

export const metadata: Metadata = {
  title: {
    default: "Flex-LMS-Dashboard",
    template: "%s | Flex-LMS-Dashboard",
  },
  description: "Flex-LMS-Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <AuthProvider>
          <body
            className={cn(
              styles.layout,
              poppin.className,
              bangli.variable,
              hind_siliguri.variable
            )}
          >
            <main>
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </main>
          </body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
