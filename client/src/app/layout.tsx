import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Management Tool - Manoj",
  description: "This is a project management tool that can keep record of progress of projec ad task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen overflow-x-hidden px-2`}><ToastContainer style={{left : '0px'}}/>{children}</body>
    </html>
  );
}
