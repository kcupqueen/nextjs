'use client';

export default function Page() {
    const level = 666
    const debugInfo = localStorage.getItem('userAnsInfos')

    return <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">After the assessment, your reading level
                    is <span className="text-4xl text-green-500">{level}</span> points</p>

                <p className="text-sm">{debugInfo}</p>
                <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    </div>
}
