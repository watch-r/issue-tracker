"use client";
import Link from "next/link";
import React from "react";
import { PiBugBeetleFill } from "react-icons/pi";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Issues", href: "/issues/list" },
    ];
    return (
        <nav className='flex space-x-6 border-b px-5 mb-5 h-14 items-center'>
            <Link href='/'>
                <PiBugBeetleFill />
            </Link>
            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={classnames({
                                "text-zinc-900": link.href === currentPath,
                                "text-zinc-400": link.href !== currentPath,
                                "hover:text-zinc-800 transition-colors": true,
                            })}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Box>
                {" "}
                {status === "authenticated" && (
                    <Link href='/api/auth/signout'>Log Out</Link>
                )}
                {status === "unauthenticated" && (
                    <Link href='/api/auth/signin'>Log In</Link>
                )}
            </Box>
        </nav>
    );
};

export default NavBar;
