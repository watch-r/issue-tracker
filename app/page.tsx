import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import Issuechart from "./Issuechart";
import LatestIssue from "./LatestIssue";
import Pagination from "./components/Pagination";
import prisma from "@/prisma/client";
import { Metadata } from "next";

export default async function Home() {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const in_progress = await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
    });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap={'5'}>
            <Flex direction={"column"} gap={"5"}>
                <IssueSummary
                    open={open}
                    closed={closed}
                    inProgress={in_progress}
                />
                <Issuechart
                    open={open}
                    closed={closed}
                    inProgress={in_progress}
                />
            </Flex>
            <LatestIssue />
        </Grid>
    );
}

export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: "View a Summary of Project Issue",
};
