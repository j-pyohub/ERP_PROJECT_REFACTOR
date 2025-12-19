import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PageLayout.css';

interface PageLayoutProps {
    children: ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="container custom-container mt-5 my-5">
            <Header />
            <main className="bg-white border rounded p-5">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default PageLayout;
