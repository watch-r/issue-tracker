"use client";
import Link from "next/link";
import React from "react";
import { PiBugBeetleFill } from "react-icons/pi";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    Avatar,
    Box,
    Button,
    Container,
    DropdownMenu,
    Flex,
    Text,
} from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";

const NavBar = () => {
    return (
        <nav className=' border-b px-5 mb-5 py-3 '>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'>
                            <PiBugBeetleFill />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    );
};

const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Issues", href: "/issues/list" },
    ];
    return (
        <ul className='flex space-x-6'>
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={classnames({
                            "nav-link":true,
                            "!text-zinc-900": link.href === currentPath,
                        })}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return null;
    if (status === "unauthenticated")
        return <Link className="nav-link" href='/api/auth/signin'>Log In</Link>;

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback='?'
                        size='2'
                        radius='full'
                        className='cursor-pointer'
                        // referrerPolicy="no-referrer"
                    ></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'> {session!.user!.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Log Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
};

export default NavBar;
