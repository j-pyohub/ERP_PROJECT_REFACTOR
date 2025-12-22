import Dropdown from "./Dropdown";
import "./Header.css";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
        <div className="w-full h-16 bg-green-100 flex justify-between items-center px-8 border-b border-green-200">
        <div className="flex items-center gap-5">
          <button className="px-3 py-1.5 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50">로고</button>
          <button className="px-3 py-1.5 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50">회사명</button>
        </div>
        <Dropdown title="매출" items={["매출 조회", "주문 조회"]} />
        <Dropdown title="품목/재고" items={["품목 조회", "재고 현황 조회", "재고 변동 조회", "발주", "발주 내역 조회", "발주 제안"]} />
        <Dropdown title="메뉴" items={["메뉴 등록", "메뉴 조회", "판매 메뉴 관리"]} />
        <div className="menu-item">
          <span>직영점 목록</span>
        </div>
        <Dropdown title="계정 관리" items={["계정 등록", "계정 목록 조회"]} />
      <div className="flex items-center gap-3 text-sm">
        <span>사용자명</span>
        <button className="px-3 py-1.5 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50">로그아웃</button>
      </div>
        </div>
    </header>
  );
}

export default Header;
