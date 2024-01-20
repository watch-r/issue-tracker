"use client";
import Link from "next/link";
import React from "react";
import { PiBugBeetleFill } from "react-icons/pi";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Issues", href: "/issues" },
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
                        className={classnames({
                            "text-zinc-900": link.href === currentPath,
                            "text-zinc-400": link.href !== currentPath,
                            "hover:text-zinc-800 transition-colors": true,
                        })}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
