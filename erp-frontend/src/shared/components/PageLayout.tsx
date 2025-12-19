import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PageLayout.css';

interface PageLayoutProps {
    children: ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="page-layout bg-light">
            <Header />
            <main className="page-content">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default PageLayout;
