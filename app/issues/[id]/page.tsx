import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
// dev only
// import delay from "delay";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) notFound();
    // await delay(2000); //development code

    return (
        <div>
            <Heading>{issue?.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue?.status} />
                <Text>{issue?.created_at.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkdown>{issue?.description}</ReactMarkdown>
            </Card>
        </div>
    );
};

export default IssueDetailPage;
