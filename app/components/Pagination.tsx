import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Flex, Text, Button } from "@radix-ui/themes";
import React from "react";

interface Props {
    itemCount: number;
    pageSize: number;
    currentpage: number;
}

const Pagination = ({ itemCount, pageSize, currentpage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null; // If there is only one
    return (
        <Flex align='center' gap='2'>
            <Text size='2'>
                {currentpage} of {pageCount}
            </Text>
            <Button variant='surface' size='1' disabled={currentpage === 1}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button variant='surface' size='1' disabled={currentpage === 1}>
                <ChevronLeftIcon />
            </Button>
            <Button
                variant='surface'
                size='1'
                disabled={currentpage === pageCount}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                variant='surface'
                size='1'
                disabled={currentpage === pageCount}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    );
};

export default Pagination;
