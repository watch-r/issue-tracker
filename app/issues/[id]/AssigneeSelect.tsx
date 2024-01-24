"use client";
import { Skeleton } from "@/app/components";
import { User, Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import prisma from "@/prisma/client";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const {
        data: users,
        error,
        isLoading,
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
        staleTime: 60 * 1000, //60sec
        retry: 3,
    });
    if (isLoading) return <Skeleton />;
    if (error) return null;

    return (
        <Select.Root
            defaultValue={issue.assignedToUserId || ""}
            onValueChange={(userId) => {
                axios.patch("/api/issues/" + issue.id, {
                    assignedToUserId: userId || null,
                });
            }}
        >
            {/* @ts-ignore */}
            <Select.Trigger placeholder='Assign... ' variant='ghost' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value={""}>Unassigned</Select.Item>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
