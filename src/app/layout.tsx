import { cn } from "@/lib/utils";
import ReduxProvider from "@/redux/reduxProvider";
import AuthProvider from "@/utilities/SessionProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { styles } from "./styles";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
          <body className={poppins.className}>
            <main className={cn(styles.layout)}>
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </main>
          </body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
