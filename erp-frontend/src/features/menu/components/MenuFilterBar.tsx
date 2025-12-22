import LabeledSelect from "../../../shared/components/LabeledSelect";

function MenuFilterBar() {
    return (
    <div className="flex items-center mb-3">
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
        <div className="ml-auto flex items-center gap-2">
            <span className="font-semibold">보기</span>
            <button className="bg-gray-800 text-white px-2 py-1 text-sm rounded" data-tab="list">목록</button>
            <button className="border border-gray-800 text-gray-800 px-2 py-1 text-sm rounded hover:bg-gray-800 hover:text-white" data-tab="image">이미지</button>
        </div>
    </div>);
}
export default MenuFilterBar;