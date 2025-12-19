import './Header.css';

function Header() {
    return (
        <header className="app-header">
            <div className="top-bar">
                <div className="left-section">
                    <button className="logo-btn">로고</button>
                    <button className="company-name-btn">회사명</button>
                </div>
                <div className="right-section">
                    <span>사용자명</span>
                    <button className="logout-btn">로그아웃</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
