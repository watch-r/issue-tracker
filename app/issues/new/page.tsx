"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const [error, setError] = useState("");

    return (
        <div className='max-w-xl'>
            <h1 className='text-2xl font-semi-bold'>Create a New issue</h1>
            {error && (
                <Callout.Root className='my-2 ' color='red'>
                    <Callout.Icon>
                        <CiCircleInfo />
                    </Callout.Icon>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form
                className=' space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issues", data);
                        router.push("/issues");
                    } catch (error) {
                        setError("An Unexpected Error Occured!");
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input
                        placeholder='Title'
                        {...register("title")}
                    />
                </TextField.Root>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description...' {...field} />
                    )}
                />

                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
