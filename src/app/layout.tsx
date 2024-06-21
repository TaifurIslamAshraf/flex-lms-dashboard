import ReduxProvider from "@/redux/reduxProvider";
import AuthProvider from "@/utilities/SessionProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
    <ReduxProvider>
      <AuthProvider>
        <html lang="en">
          <body className={poppins.className}>
            <main className="max-w-screen-2xl mx-auto">
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </main>
          </body>
        </html>
      </AuthProvider>
    </ReduxProvider>
  );
}
