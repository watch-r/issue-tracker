"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const Issuechart = ({ open, inProgress, closed }: Props) => {
    const data = [
        {
            label: "Open",
            value: open,
        },
        {
            label: "In Progress",
            value: inProgress,
        },
        {
            label: "Closed",
            value: closed,
        },
    ];
    return (
        <Card>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                    <XAxis dataKey={"label"} stroke='#8884d8' />
                    <YAxis />
                    {/* <Tooltip
                        wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                    />
                    <Legend
                        width={100}
                        wrapperStyle={{
                            top: 40,
                            right: 20,
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #d5d5d5",
                            borderRadius: 3,
                            lineHeight: "40px",
                        }}
                    />
                    <CartesianGrid stroke='#ccc' strokeDasharray='5 5' /> */}
                    <Bar
                        dataKey={"value"}
                        style={{ fill: "var(--accent-9)" }}
                        barSize={60}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default Issuechart;
