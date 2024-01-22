import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
    status: Status;
}

const statusMap: Record<
    Status,
    {
        label: string;
        color: "ruby" | "plum" | "jade";
    }
> = {
    OPEN: { label: "Open", color: "ruby" },
    CLOSED: { label: "Closed", color: "plum" },
    IN_PROGRESS: { label: "In Progress", color: "jade" },
};
const IssueStatusBadge = ({ status }: Props) => {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    );
};

export default IssueStatusBadge;
