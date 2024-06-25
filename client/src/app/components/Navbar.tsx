import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <ul className="flex justify-between px-10 py-5 bg-gray-800 text-white">
            <li className="mr-6">
                <Link href="/">
                    Login
                </Link>
            </li>
            <li>
                <Link href="/register">
                    Register
                </Link>
            </li>
        </ul>
    )
}

export default Navbar