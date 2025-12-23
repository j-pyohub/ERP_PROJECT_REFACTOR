function SalesChartSection() {
    return (
        <>
            <div className="mb-4">
                <div className="bg-light rounded p-3">필터 영역</div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="kpi-card">
                        <div className="kpi-title">전체 매출</div>
                        <div className="kpi-value">-</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="kpi-card">
                        <div className="kpi-title">총 판매 수량</div>
                        <div className="kpi-value">-</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="kpi-card">
                        <div className="kpi-title">평균 직영점 매출</div>
                        <div className="kpi-value">-</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="kpi-card">
                        <div className="kpi-title">전주 대비 매출 증가</div>
                        <div className="kpi-value">-</div>
                    </div>
                </div>
            </div>

            <div className="section-box mb-4">
                <h6 className="fw-bold mb-3">전체 매출 추이</h6>
                <div style={{ height: 300 }} className="bg-light rounded" />
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                    <div className="section-box">
                        <h6 className="fw-bold mb-3">최근 30일 지점별 매출 TOP 5</h6>
                        <div style={{ height: 250 }} className="bg-light rounded" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="section-box">
                        <h6 className="fw-bold mb-3">최근 30일 메뉴별 매출 비중</h6>
                        <div style={{ height: 250 }} className="bg-light rounded" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesChartSection;
