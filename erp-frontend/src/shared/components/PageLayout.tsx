import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PageLayout.css';

interface PageLayoutProps {
    children: ReactNode;
}

function PageLayout({ children, showHeader = true }: PageLayoutProps) {
    return (
        <div className="max-w-7xl mx-auto mt-5 mb-5">
            {showHeader && <Header />}
            <main className="bg-white border rounded p-5">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default PageLayout;