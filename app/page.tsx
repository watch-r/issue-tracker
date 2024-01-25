import IssueSummary from "./IssueSummary";
import Issuechart from "./Issuechart";
import LatestIssue from "./LatestIssue";
import Pagination from "./components/Pagination";
import prisma from "@/prisma/client";

export default async function Home() {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const in_progress = await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
    });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    return (
        <>
            <Issuechart
                open={open}
                inProgress={in_progress}
                closed={closed}
            />
        </>
    );
}
