
export interface GithubProfileResponse {
    login: string;
    avatar_url: string;
    html_url: string;
    gists_url: string;
}

export interface GistInfo {
    url: string;
    created_at: string;
    files: Record<string, {
        filename: string;
        type: string;
        raw_url: string;
        content?: string;
    }>;
}

export type ListGistsResponse = ReadonlyArray<GistInfo>;

export function getGistId(gist: GistInfo) {
    return gist.url.substring(gist.url.lastIndexOf("/") + 1);
}


// How to display some public gists as if they're special blog posts
// Basically, we take the posts and then on the FE we convert things to special react elements, statically.