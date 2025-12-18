function MenuFilterBar() {
    return (
    <div className="d-flex align-items-center mb-3">
        <div className="me-4">
            <label className="fw-semibold me-2">카테고리</label>
            <select className="form-select d-inline-block w-auto" id="category">
                <option value="">전체</option>
                <option value="피자">피자</option>
                <option value="사이드디시">사이드디시</option>
                <option value="음료">음료</option>
                <option value="기타">기타</option>
            </select>
        </div>

        <div className="me-4">
            <label className="fw-semibold me-2">출시 상태</label>
            <select className="form-select d-inline-block w-auto" id="releaseStatus">
                <option value="">전체</option>
                <option value="출시 예정">출시 예정</option>
                <option value="출시 중">출시 중</option>
                <option value="출시 중단">출시 중단</option>
            </select>
        </div>

        {/* 탭 버튼 */}
        <div className="ms-auto d-flex align-items-center gap-2">
            <span className="fw-semibold">보기</span>
            <button className="btn btn-dark btn-sm" data-tab="list">목록</button>
            <button className="btn btn-outline-dark btn-sm" data-tab="image">이미지</button>
        </div>
    </div>);
}
export default MenuFilterBar;