"use client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { Status } from "@prisma/client";

const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            {/* @ts-ignore */}
            <Select.Trigger placeholder='Filter By status...' variant='ghost'/>
            <Select.Content variant='solid'>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || ""}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;
