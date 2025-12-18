import LabeledSelect from "../../../shared/components/LabeledSelect";

function MenuFilterBar() {
    return (
    <div className="d-flex align-items-center mb-3">
        <LabeledSelect
            id="menuCategory"
            label="카테고리"
            className="me-4"
            options={[
                { value: "", label: "전체" },
                { value: "피자", label: "피자" },
                { value: "사이드디시", label: "사이드디시" },
                { value: "음료", label: "음료" },
                { value: "기타", label: "기타" }
            ]}
        />
        <LabeledSelect
        id="releaseStatus"
        label="출시 상태"
        className="me-4"
        options={[
          { value: "", label: "전체" },
          { value: "출시 예정", label: "출시 예정" },
          { value: "출시 중", label: "출시 중" },
          { value: "출시 중단", label: "출시 중단" },
        ]}
      />

        {/* 탭 버튼 */}
        <div className="ms-auto d-flex align-items-center gap-2">
            <span className="fw-semibold">보기</span>
            <button className="btn btn-dark btn-sm" data-tab="list">목록</button>
            <button className="btn btn-outline-dark btn-sm" data-tab="image">이미지</button>
        </div>
    </div>);
}
export default MenuFilterBar;