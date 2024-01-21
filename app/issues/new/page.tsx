"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <h1 className='text-2xl font-semi-bold'>Create a New issue</h1>
            <TextField.Root>
                <TextField.Input placeholder='Title' />
            </TextField.Root>
            <SimpleMDE placeholder='Description...' />
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
