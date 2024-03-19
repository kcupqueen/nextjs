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
    const [link, setLink] =
        useState({name: 'Next', href: '#', icon: ArrowRightIcon, debug: 'fuck'});


    let correct = false;
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        correct = parseInt(event.target.value) === correctIdx;
        console.log(`correct`, correct)
        const params = new URLSearchParams(searchParams);

        const nextLevel = correct ? level + 100 : level - 100;
        params.set('level', nextLevel.toString());
        const updatedLink = {...link};
        updatedLink.href = `${pathname}?${params.toString()}`;
        updatedLink.debug = `nextLevel${nextLevel};href:${updatedLink.href}`
        console.log(`nextLevel`, nextLevel, `link.href`, updatedLink.href)
        setLink(updatedLink);

    };

    const LinkIcon = link.icon;
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
            <p className="text-gray-500">todo delete this: {link.debug}</p>
            <div>
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    )}>
                    <LinkIcon className="w-6"/>
                    <p className="hidden md:block">{link.name}</p>
                </Link>
            </div>
        </div>
    );
};

export default Article;
// export type, Article

