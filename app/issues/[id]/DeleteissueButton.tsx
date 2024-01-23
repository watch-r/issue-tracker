"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DeleteissueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='crimson' variant='surface'>
                        <TrashIcon />
                        <Text className='text-xs'>Delete Issue</Text>
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
                                onClick={async () => {
                                    await axios.delete(
                                        "/api/issues/" + issueId
                                    );
                                    router.push("/issues");
                                    router.refresh();
                                }}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteissueButton;
