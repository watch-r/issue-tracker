"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

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
    const [isSubmiting, setSubmiting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmiting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (error) {
            setSubmiting(false);
            setError("An Unexpected Error Occured!");
        }
    });

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
            <form className=' space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        placeholder='Title'
                        {...register("title")}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description...' {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmiting}>
                    Submit New Issue {isSubmiting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
