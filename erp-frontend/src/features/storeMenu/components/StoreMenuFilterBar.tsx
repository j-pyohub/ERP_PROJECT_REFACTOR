import LabeledSelect from "../../../shared/components/LabeledSelect";

function StoreMenuFilterBar() {
    return (
        <div className="d-flex flex-column gap-2 mb-2">
            {/* 1줄: 셀렉트 3개 + 지점 선택 + 조회 버튼 */}
            <div className="d-flex align-items-end flex-wrap">
                <LabeledSelect
                    id="salesStatus"
                    label="판매 상태"
                    className="me-1"
                    stacked
                    options={[
                        { value: "", label: "전체" },
                        { value: "판매중", label: "판매중" },
                        { value: "판매중단", label: "판매중단" },
                        { value: "품절", label: "품절" },
                    ]}
                />
                <LabeledSelect
                    id="menuCategory"
                    label="카테고리"
                    className="me-1"
                    stacked
                    options={[
                        { value: "", label: "전체" },
                        { value: "피자", label: "피자" },
                        { value: "사이드디시", label: "사이드디시" },
                        { value: "음료", label: "음료" },
                        { value: "기타", label: "기타" }
                    ]}
                />
                <LabeledSelect
                    id="searchCondition"
                    label="검색 조건"
                    className="me-1"
                    stacked
                    options={[
                        { value: "직영점", label: "직영점" },
                        { value: "메뉴", label: "메뉴" },
                    ]}
                />

                <div className="d-flex align-items-end ms-1 mt-3 mt-md-0">
                    <input
                        type="text"
                        id="storeInput"
                        className="form-control form-control-sm me-2"
                        placeholder="여기를 눌러 선택하세요"
                        readOnly
                    />
                    <button className="btn custom-btn btn-sm" id="searchBtn">
                        조회
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StoreMenuFilterBar;