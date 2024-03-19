'use client';
import {useState, ChangeEvent} from 'react';
import Link from 'next/link';
import {
    UserGroupIcon,
    HomeIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import {  usePathname, useSearchParams } from 'next/navigation';


import clsx from 'clsx'; // css conditional classes

export type ArticleData = {
    _id: string;
    level: number,
    title: string;
    content: string;
    question: string;
    answers: string[];
    correctAnsIdx: number,
}

function Article({data}: { data: ArticleData }) {
    const {title, content, question, answers, correctAnsIdx, level} = data;
    return (
        <>
            <div
                className="bg-white rounded-lg shadow-md p-4 md:p-6 m-4 md:m-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-700 mt-2">{content}</p>
            </div>
            <div>
                <RadioGroup answers={answers} question={question} correctIdx={correctAnsIdx} level={level}/>
            </div>
        </>
    );
}


const RadioGroup = ({question, answers, correctIdx, level}: {
    question: string,
    answers: string[],
    correctIdx: number,
    level: number
}) => {

    const [selectedOption, setSelectedOption] = useState('');

    const [levelNow, setLevel] = useState(level);

    let correct = false;
    let nextLevel = level;
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        correct = parseInt(event.target.value) === correctIdx;
        nextLevel = correct ? level + 100 : level - 100;
        setLevel(nextLevel);
    };

    const radioButtons = answers.map((ans, index) => {
        return (
            <label key={ans} className="flex items-center">
                <input
                    type="radio"
                    value={index}
                    checked={parseInt(selectedOption) === index}
                    onChange={handleOptionChange}
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
                    onClick={() => {
                        // levelNow
                        console.log('levelNow', levelNow);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Button
                </button>
            </div>
        </div>
    );
};

export default Article;
// export type, Article

