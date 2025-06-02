import Navbar from '../components/NavBar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-2">
                {children}
            </main>
        </div>
    );
}
