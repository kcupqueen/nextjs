'use client';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

function Judge() {
    const [userAnsInfos, setUserAnsInfos] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const tmp = localStorage.getItem('userAnsInfos') || '';

        if (tmp) {
            setUserAnsInfos(tmp);
        } else {
            router.push('/');
        }
        setIsDataLoaded(true);

    }, [router]);

    if (!isDataLoaded) {
        return null; // or a loading spinner
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">After the assessment, your reading level
                            is <span className="text-4xl text-green-500">999</span> points</p>

                        <p className="text-sm">{userAnsInfos}</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Judge;