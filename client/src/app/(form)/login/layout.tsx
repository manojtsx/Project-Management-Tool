import React from 'react';
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "PMT - Login",
    description: "This is a login page of project management tool."
};

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <>{children}</>;
};

export default Layout;