import Link from "next/link";
import React from "react";
import { PiBugBeetleFill } from "react-icons/pi";

const NavBar = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/" },
    ];
    return (
        <nav className='flex space-x-6 border-b px-5 mb-5 h-14 items-center'>
            <Link href='/'>
                <PiBugBeetleFill />
            </Link>
            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className='text-zinc-600 hover:text-zinc-900 transition-colors'
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
