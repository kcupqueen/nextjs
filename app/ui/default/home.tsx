// temporary home page 2024-03-24
import Image from 'next/image';
import { useRouter } from 'next/navigation'

function GetBackGroundImage() {
    return (
        <Image
            src="/background.jpg"
            width={1920}
            height={1080}
            alt="background"
        />
    )

}

const i18nInstructions = {
    'En': {
        'title': 'Hello there',
        'content': 'choose your approximate reading level, we will provide you with suitable articles.',
        'button': 'Start choosing',
        'levels': ['Beginner', 'Intermediate', 'Advanced'],

    },
    'Cn': {
        'title': '欢迎',
        'content': '选出你大致的阅读水平，我们将为你提供适合的文章。',
        'button': '開始选择',
        'levels': ['初级', '中级', '高级'],
    }
}
const levelIntArr = [300, 600, 900]

function DropDown({title, items}: { title: string, items: string[] }) {
    const router = useRouter()

    const NavigateToQuiz = (level: number) => {
        console.log(`NavigateToQuiz`, level)
        localStorage.setItem('levelStart', level.toString())
        router.push(`/quizz`)
    }

    const li = items.map((item, i) => {
        return <li key={i} value={i} style={{fontWeight: 'bold', color: 'black'}} onClick={(item) => {
            const v = item.currentTarget.getAttribute('value')
            console.log(`click`, v)
            v && NavigateToQuiz(levelIntArr[parseInt(v)])
        }}><a>{item}</a></li>

    })

    return (
        <details className="dropdown">
            <summary className="m-1 btn">{title}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                {li}
            </ul>
        </details>
    )
}

function Home0() {

    const defaultLang = 'En'
    const instruction = i18nInstructions[defaultLang]
    const dropDownTitle = instruction.button
    const items = instruction.levels
    return (
        <div className="hero min-h-screen"
             style={{backgroundColor: `lightblue`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{instruction.title}</h1>
                    <p className="mb-5">{instruction.content}</p>
                    <DropDown title={dropDownTitle} items={items}/>
                </div>
            </div>
        </div>
    )
}

export default Home0;