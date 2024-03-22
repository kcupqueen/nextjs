'use client';
import {ChangeEvent, useEffect, useState} from 'react';


export type ArticleData = {
    _id: string;
    level: number,
    title: string;
    content: string;
    question: string;
    answers: string[];
    correctAnsIdx: number,
}

const filterArticleByLevel = (list: ArticleData[], filterLevel: number) => {
    if (filterLevel < 200) {
        filterLevel = 200
    }
    if (filterLevel > 1000) {
        filterLevel = 1000
    }

    console.log(`filter level`, filterLevel)
    return list.filter((item) => {
        // range -50 +50
        return item.level >= filterLevel - 50 && item.level <= filterLevel + 50;
    })[0]
}

const getNextLevel = (currentLevel: number, ok: boolean) => {
    if (ok) {
        return currentLevel + 50
    } else {
        return currentLevel - 50
    }
}

function Article({list, filterLevel}: { list: ArticleData[] , filterLevel: number}) {

    // client next Level
    const [nextLevel, setLevelState] = useState(filterLevel);

    function handleSubmitAns(option: number, ok: boolean, article: ArticleData) {
        // get user selected option
        console.log('User selected option:', option, ok);
        // update next level
        setLevelState(getNextLevel(nextLevel, ok));
        localStorage.setItem(`articleId_${article._id}`, `${ok}:${article.level}`)
        // log how many articles user has done
        let cnt = localStorage.getItem('articleCount')
        if (cnt) {
            cnt = `${parseInt(cnt) + 1}`
            localStorage.setItem('articleCount', `${parseInt(localStorage.getItem('articleCount') as string) + 1}`)
        } else {
            cnt = '1'
            console.log(`init to 1`)
            localStorage.setItem('articleCount', '1')
        }
        console.log('User has done', cnt, 'articles')
        if (parseInt(cnt) >= 10) { // todo limit by configured threshold


        }
    }

    const data = filterArticleByLevel(list, nextLevel);
    if (!data) {
        return (
            <div>
                <h1>No article found</h1>
            </div>
        )
    }

    let {title, content} = data;
    return (
        <>
            <div
                className="bg-white rounded-lg shadow-md p-4 md:p-6 m-4 md:m-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-700 mt-2">{content}</p>
                <p className="text-gray-700 mt-2">Level: {data.level}</p>
            </div>
            <div>
                <RadioGroup article={data} onButtonClick={handleSubmitAns}
                />
            </div>
        </>
    );
}


const RadioGroup = ({article, onButtonClick}:{article: ArticleData, onButtonClick: (option: number, ok: boolean,  article: ArticleData) => void}) => {
    const [selectedOption, setSelectedOption] = useState('');
    let {question, answers, correctAnsIdx, level, } = article;

    const HandleOptionChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const radioButtons = answers.map((ans, index) => {
        return (
            <label key={ans} className="flex items-center">
                <input
                    type="radio"
                    value={index}
                    checked={parseInt(selectedOption) === index}
                    onChange={HandleOptionChange}
                    className="form-radio text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="ml-2">{ans}</span>
            </label>
        );
    });


    return (
        <div className="flex flex-col space-y-2">
            <label className="font-bold">{question}</label>
            <div className="flex flex-col space-y-2">
                {radioButtons}
            </div>
            <p className="text-gray-500">Selected: {selectedOption}</p>
            <div>
                <button
                    onClick={() => onButtonClick(parseInt(selectedOption), parseInt(selectedOption) === correctAnsIdx, article)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Button
                </button>
            </div>
        </div>
    );
};

export default Article;
// export type, Article

