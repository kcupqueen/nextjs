'use client';
import {ChangeEvent, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'
import React from 'react';


const maxAnsThreshold = 5

export type ArticleData = {
    _id: string;
    level: number,
    title: string;
    content: string;
    question: string;
    answers: string[];
    correctAnsIdx: number,
}

export type UserAnswerInfo = {
    articleId: string;
    isCorrect: boolean;
    level: number;
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
    // todo fixme
    return currentLevel
    if (ok) {
        return currentLevel + 50
    } else {
        return currentLevel - 50
    }
}


function Article({list, filterLevel}: { list: ArticleData[], filterLevel: number}) {
    const router = useRouter()

    // client next Level
    const [nextLevel, setLevelState] = useState(filterLevel);
    const [userAnsInfos, setUserAnsInfos] = useState([] as UserAnswerInfo[]);
    const [showAlert, setShowAlert] = useState(false); // Add this line

    function handleSubmitAns(option: number, ok: boolean, article: ArticleData) {
        // get user selected option
        console.log('User selected option:', option, ok);
        // update next level
        setLevelState(getNextLevel(nextLevel, ok));
        // save user answer info
        setUserAnsInfos([...userAnsInfos, {
            articleId: article._id,
            isCorrect: ok,
            level: article.level
        }])
        setShowAlert(true); // Add this line
        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    }

    useEffect(() => {
        console.log(`current length`, userAnsInfos?.length, maxAnsThreshold)
        // show alert here

        if (userAnsInfos?.length >= maxAnsThreshold) {
            console.log(`user ans list is`, JSON.stringify(userAnsInfos))
            localStorage.setItem('userAnsInfos', JSON.stringify(userAnsInfos))
            router.push('/quizz/judgement')
        }
    }, [router, userAnsInfos]);

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
                className="bg-white rounded-lg shadow-md p-4 md:p-24 m-4 md:m-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-black-700 mt-2">{formatContent(content)}</p>
                <p className="text-gray-700 mt-2">Level: {data.level}</p>
            </div>
            <div>
                <RadioGroup article={data} onButtonClick={handleSubmitAns}
                />
            </div>
            <div>
                <ProgressBar current={userAnsInfos.length} total={maxAnsThreshold}/>
            </div>
            {showAlert && <SubmitAlert userAnsInfos={userAnsInfos} />} {/* Modify this line */}
        </>

    );
}
function formatContent(content: string) {
    return content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
}


const ProgressBar = ({current, total}: { current: number, total: number }) => {
    const progress = (current / total) * 100;

    return (
        <>
            <progress className="progress progress-accent w-56" value={progress} max="100"></progress>
        </>
    );
}

const SubmitAlert = ({userAnsInfos}: { userAnsInfos: UserAnswerInfo[] }) => {
    const order = userAnsInfos.length
    return (
        <>
            <div role="alert" className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Answer {order} has submitted</span>
            </div>
        </>
    )
}

const RadioGroup = ({article, onButtonClick}: {
    article: ArticleData,
    onButtonClick: (option: number, ok: boolean, article: ArticleData) => void
}) => {
    const [selectedOption, setSelectedOption] = useState('0');
    let {question, answers, correctAnsIdx, level,} = article;

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button
                    onClick={() => onButtonClick(parseInt(selectedOption), parseInt(selectedOption) === correctAnsIdx, article)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Article;
// export type, Article

