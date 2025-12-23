import { SalesFilterBar } from "./SalesFilterBar";

export function SalesListSection() {
    const handleListSearch  = () => {
        console.log("차트 조회");
    };


    return (
        <div className="section-box mt-3">
            <h6 className="fw-bold mb-3">직영점별 매출 리스트</h6>

            <div className="mb-3">
                <SalesFilterBar
                    showPeriodType={false}
                    onSearch={handleListSearch }
                />
            </div>

            <table className="table table-hover align-middle">
                <thead>
                <tr className="text-center">
                    <th>번호</th>
                    <th>직영점명</th>
                    <th>지역</th>
                    <th>전일대비</th>
                    <th>주문수</th>
                    <th>매출액</th>
                    <th>판매날짜</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={8} className="text-center">
                        데이터가 없습니다.
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="d-flex justify-content-center mt-3">
                <div className="text-muted">페이지네이션 영역</div>
            </div>
        </div>
    );
}

