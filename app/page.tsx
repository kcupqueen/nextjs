'use client';
import Home0 from "@/app/ui/default/home"
import GenerateMockDate from "@/app/lib/default/mock_article";
import { useEffect } from 'react';


export default function Home() {


    // clear local storage
    useEffect(() => {
        // Clear local storage on page load
        localStorage.clear();
    }, []);

    return (
        <>
            <Home0 />
        </>
    );
}


