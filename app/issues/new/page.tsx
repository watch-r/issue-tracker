"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
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
                {errors.title && (
                    <Text color='red' as='p'>
                        {errors.title.message}
                    </Text>
                )}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description...' {...field} />
                    )}
                />
                {errors.description && (
                    <Text color='red' as='p'>
                        {errors.description.message}
                    </Text>
                )}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
