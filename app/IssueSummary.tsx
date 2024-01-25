import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Status } from "@prisma/client";
import Link from "next/link";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const containers: { label: string; value: number; status: Status }[] = [
        {
            label: "Open Issues",
            value: open,
            status: "OPEN",
        },
        {
            label: "Closed Issues",
            value: closed,
            status: "CLOSED",
        },
        {
            label: "In-Progress Issues",
            value: inProgress,
            status: "IN_PROGRESS",
        },
    ];
    return (
        <Flex gap={"4"}>
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction='column' gap={'2'}>
                        <Link className='text-sm font-medium'href={`/issues/list?status=${container.status}`}>
                            {container.label}
                        </Link>
                        <Text size={'5'} className="font-bold">{container.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default IssueSummary;
