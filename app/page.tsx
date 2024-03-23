'use client';
import Article from "@/app/ui/default/article";
import GenerateMockDate from "@/app/lib/default/mock_article";
import {useEffect} from "react";


export default function Home() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.clear()
        }
    }, []);
    const level = 600
    // clear local storage
    const mockArticleData = GenerateMockDate()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <div className="flex flex-col items-center justify-start min-h-screen py-2">
                <h1 className="text-3xl font-bold mb-4">Latest Article</h1>
                 <Article list={mockArticleData} filterLevel={level}/>
            </div>
        </main>
    );
}


