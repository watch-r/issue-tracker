import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { type } from "os";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import React from "react";
import classnames from 'classnames';

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) notFound();
    return (
        <div>
            <Heading>{issue?.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue?.status} />
                <Text>{issue?.created_at.toDateString()}</Text>
            </Flex>
            <Card className="prose" mt="4">
                <ReactMarkdown>{issue?.description}</ReactMarkdown>
            </Card>
        </div>
    );
};

export default IssueDetailPage;
