export default function Layout({ children }: { children: React.ReactNode }) {
   // return default layout
    return (
        <main className="flex flex-col h-screen">
            {children}
        </main>
    );
}