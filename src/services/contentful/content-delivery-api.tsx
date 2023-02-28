import useSWR from 'swr';
import React from "react";
const API_BASE_URL = 'https://cdn.contentful.com';

export const GetTitle: React.FC = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading} = useSWR(`${API_BASE_URL}/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/${import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID}/entries/${import.meta.env.VITE_FIRST_ENTRY_ID}?access_token=${import.meta.env.VITE_CONTENTFUL_API_KEY}`, fetcher);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
        <>
            <div>{data.fields.title}</div>
            <br></br>
            <div>{data.fields.japaneseVoice}</div>
            <br></br>
            <div>{data.fields.englishVoice}</div>
        </>
    );
}