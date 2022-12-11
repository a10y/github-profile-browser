import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getGistId, GistInfo, GithubProfileResponse, ListGistsResponse } from "../../types/github";

export function ProfileView() {
    const { id } = useParams();
    const profileQuery = useQuery(`${id}-v0`, async () => {
        const [profile, gists] = await Promise.all([
            loadProfile(id!),
            loadMarkdownGists(id!),
        ]);

        return {
            profile: profile,
            gists: gists,
        };
    });

    console.log("Render profile view");

    return profileQuery.isSuccess ?
        renderLoadedPage({
            username: id!,
            data: profileQuery.data,
        })
        : renderLoadingPage(id!);
}

const renderLoadingPage = (username: string) => {
    return (
        <Typography variant="body2">Loading details of {username}...</Typography>
    );
};

const renderLoadedPage = ({username, data}: {username: string, data: {profile: GithubProfileResponse, gists: ReadonlyArray<string>} }) => (
    <Box sx={{maxWidth: 300}}>
        <Typography variant="h3">{data.profile.login}</Typography>
        <img src={data.profile.avatar_url} width={300} alt={username} />

        <Typography variant="h2">Posts</Typography>
        {
            data.gists.map(gist => {
                return <Link key={gist} to={`/posts/${gist}`}>Post</Link> ;
            })
        }
    </Box>
);

const loadProfile = async (username: string) => {
    const profile = await axios.get<GithubProfileResponse>(`https://api.github.com/users/${username}`);
    return profile.data;
}

const loadMarkdownGists = async (username: string) => {
    try {
        const results = await axios.get<ListGistsResponse>(`https://api.github.com/users/${username}/gists`);
        const gists = results.data;
        console.log("GISTS", gists);

        return gists.filter(hasSingleMarkdownFile).map(getGistId);
    } catch (e) {
        console.error(e);
        return [];
    }
}

function hasSingleMarkdownFile(gist: GistInfo) {
    return Object.getOwnPropertyNames(gist.files).length === 1
        && gist.files[Object.getOwnPropertyNames(gist.files)[0]].type === "text/markdown";
}
