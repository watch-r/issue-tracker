"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import SimpleMDE from 'react-simplemde-editor';
import { z } from "zod";


type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    });
    const [error, setError] = useState("");
    const [isSubmiting, setSubmiting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmiting(true);
            if (issue) await axios.patch("/api/issues/" + issue.id, data);
            else await axios.post("/api/issues", data);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setSubmiting(false);
            setError("An Unexpected Error Occured!");
        }
    });

    return (
        <div className='max-w-xl'>
            <h1 className='text-2xl font-semi-bold mb-2'>
                {" "}
                {issue ? 'Update The Issue' : "Create a New Issue"}
            </h1>
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
                        defaultValue={issue?.title}
                        {...register("title")}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description...' {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmiting}>
                    {issue ? "Update Issue" : "Submit New Issue"}{" "}
                    {isSubmiting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
