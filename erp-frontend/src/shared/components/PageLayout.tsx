import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PageLayout.css';


interface PageLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
}

function PageLayout({ children, showHeader = true }: PageLayoutProps) {
    return (
        <div className="max-w-7xl mx-auto mt-10 mb-5">
            {showHeader && <Header />}
            <main className="bg-white border rounded-xl p-8 px-5 shadow-sm">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default PageLayout;