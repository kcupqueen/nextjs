import Image from "next/image";
import Article from "@/app/ui/default/article";
import {ArticleData} from "@/app/ui/default/article";
const mockArticleData: ArticleData = {
    _id: "123456",
    level: 3,
    title: "Sample Article",
    content: "This is a sample article content.",
    questions: ["Question 1", "Question 2", "Question 3"],
    answers: ["Answer 1", "Answer 2", "Answer 3"]
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <div className="flex flex-col items-center justify-start min-h-screen py-2">
                <h1 className="text-3xl font-bold mb-4">Latest Article</h1>
                <Article data={mockArticleData}/>
            </div>
        </main>
    );
}


