function StoreMenuListTableView() {
    return (
        <>
            <div className="text-end pb-1">
                <button className="btn custom-btn" id="statusSetAllBtn">
                    선택 일괄 변경
                </button>
            </div>

            <div className="scroll-area">
                <table className="table align-middle text-center table-fixed-header">
                    <thead className="table-light">
                        <tr>
                            <th>직영점</th>
                            <th>메뉴코드</th>
                            <th>메뉴명</th>
                            <th>사이즈</th>
                            <th>가격</th>
                            <th>판매 상태</th>
                            <th>상태 변경</th>
                            <th>
                                <input type="checkbox" id="checkAll" />
                            </th>
                        </tr>
                    </thead>

                    <tbody id="menuTableBody"></tbody>
                </table>
            </div>
        </>         
    );
}

export default StoreMenuListTableView;