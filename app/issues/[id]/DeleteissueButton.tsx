"use client";
import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteissueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const deleteIssue = async () => {
        try {
            setDeleting(true);
            await axios.delete("/api/issues/" + issueId);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setDeleting(false);
            setError(true);
        }
    };
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button
                        color='crimson'
                        variant='surface'
                        disabled={isDeleting}
                    >
                        <TrashIcon />
                        <Text>Delete</Text>
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size='2'>
                        Are you sure? This issue will no longer be available and
                        can not be undone.
                    </AlertDialog.Description>

                    <Flex gap='3' mt='4' justify='end'>
                        <AlertDialog.Cancel>
                            <Button variant='outline' color='gray'>
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                variant='surface'
                                color='red'
                                onClick={deleteIssue}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be Deleted
                    </AlertDialog.Description>
                    <Button
                        mt='2'
                        variant='surface'
                        color='teal'
                        onClick={() => setError(false)}
                    >
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteissueButton;
