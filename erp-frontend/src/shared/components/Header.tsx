import "./Header.css";

function Header() {
  return (
    <header className="app-header top-bar">
        <div className="left-section">
          <button className="logo-btn">로고</button>
          <button className="company-name-btn">회사명</button>
        </div>
        <div className="menu-item dropdown">
          <span>매출 ▾</span>
          <div className="dropdown-menu">
            <a>매출 조회</a>
            <a>매출 조회</a>
            <a>주문 조회</a>
          </div>
        </div>
        <div className="menu-item dropdown">
          <span>품목/재고 ▾</span>
          <div className="dropdown-menu">
            <a>품목 조회</a>
            <a>재고 현황 조회</a>
            <a>재고 현황 조회</a>
            <a>재고 변동 조회</a>
            <a>재고 변동 조회</a>
            <a>발주</a>
            <a>발주 내역 조회</a>
            <a>발주 내역 조회</a>
            <a>발주 제안</a>
          </div>
        </div>

        <div className="menu-item dropdown">
          <span>메뉴 ▾</span>
          <div className="dropdown-menu">
            <a>메뉴 등록</a>
            <a>메뉴 조회</a>
            <a>판매 메뉴 관리</a>
            <a>판매 메뉴 관리</a>
          </div>
        </div>

        <div className="menu-item">
          <span>직영점 목록</span>
        </div>

        <div>
          <span>계정관리 ▾</span>
          <div className="dropdown-menu">
            <a>계정 등록</a>
            <a>계정 목록 조회</a>
          </div>
        </div>
      <div className="right-section">
        <span>사용자명</span>
        <button className="logout-btn">로그아웃</button>
      </div>
    </header>
  );
}

export default Header;
