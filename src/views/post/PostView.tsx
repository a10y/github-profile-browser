import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GistInfo } from "../../types/github";

export function PostView() {
    const { gistId } = useParams();

    const post = useQuery(`${gistId!}`, async () => {
        const result = await axios.get<GistInfo>(`https://api.github.com/gists/${gistId}`);
        const filenames = Object.getOwnPropertyNames(result.data.files);
        return result.data.files[filenames[0]];
    })

    if (post.isSuccess) {
        const { content, filename } = post.data;

        return (
        <Box sx={{maxWidth: 1000}}>
            <Typography variant="h2">{filename}</Typography>
            <ReactMarkdown>{content!}</ReactMarkdown>
        </Box>);
    } else {
        return <React.Fragment />
    }
}
