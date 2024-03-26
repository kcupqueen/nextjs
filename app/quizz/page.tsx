'use client';
import Article from "@/app/ui/default/article";
import {ArticleData} from "@/app/ui/default/article";
import { useEffect, useState } from 'react';
import {fetchArticles} from "@/app/lib/default/article";


function format(list: any[]): ArticleData[] {
    return list.map(item => {
        const {answer, options, question} = JSON.parse(item.question)

        return {
            _id: item._id,
            level: item.level,
            title: item.title || 'story',
            content: item.content,
            question: question,
            answers: options,
            correctAnsIdx: parseInt(answer),
        }
    });
}

export default function Home({
                                 searchParams,
                             }: {
    searchParams?: {
        x?: string;
    };
}) {
    const level = 900
    const emptyAList = [] as ArticleData[]
    const [articleList, setArticleList] = useState(emptyAList);
    console.log(`search params`, searchParams)
    // FIXME server rendered
    useEffect(() => {
        // Clear local storage on page load
        localStorage.clear();

        // Call async function and set state
        const fetchData = async () => {
            const data = await fetchArticles();
            console.log(`data len`, data?.length)
            if (data && data?.length) {
                const formattedData = format(data);
                setArticleList(formattedData);
            }

        };

        fetchData().then()
    }, []);

    if (articleList?.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <div className="flex flex-col items-center justify-start min-h-screen py-2">
                <Article list={articleList} filterLevel={level}/>
            </div>
        </main>
    );
}

