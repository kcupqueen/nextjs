import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <div className="flex flex-col items-center justify-start min-h-screen py-2">
                <h1 className="text-3xl font-bold mb-4">Latest Article</h1>
                <Article title={article.title} content={article.content}/>
            </div>
        </main>
    );
}


type ArticleData = {
    title: string;
    content: string;
}

const article: ArticleData =
    {
        title: 'Paragraph1',
        content: 'Dark clouds covered the sky as the cart creaked and rattled over the weedy path. The air was heavy with impending rain. Jack glanced back at the king and queen. The king was shivering as Guinevere wiped his forehead with a cloth.'
    }


function Article({ title, content }: ArticleData) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 m-4 md:m-8 flex flex-col items-center justify-center w-full">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-700 mt-2">{content}</p>
        </div>
    );
}