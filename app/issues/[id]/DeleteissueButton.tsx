import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

const DeleteissueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button color='crimson' variant='surface'>
            <TrashIcon />
            <Link href={`/issues/${issueId}/delete`}>
                <Text className="text-xs">Delete Issue</Text>
            </Link>
        </Button>
    );
};

export default DeleteissueButton;
