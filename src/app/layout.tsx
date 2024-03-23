import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Anjochow"
const APP_TEMPLATE_TITLE = "%s - Anjochow"
const APP_DEFAULT_TITLE = "Anjochow - Delight Your Palate, Simplify Your Life: Where Every Bite Counts!"
const APP_DEFAULT_DESCRIPTION = "Elevate dining with our food delivery & meal planning service. Enjoy curated meals tailored to your taste & lifestyle. Convenient & memorable. Join us!"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TEMPLATE_TITLE
  },
  description: APP_DEFAULT_DESCRIPTION,
  formatDetection: {
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TEMPLATE_TITLE,
    },
    description: APP_DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TEMPLATE_TITLE,
    },
    description: APP_DEFAULT_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
