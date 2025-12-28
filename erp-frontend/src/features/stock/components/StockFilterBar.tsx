import Button from "../../../shared/components/Button";
import { LabeledInput } from "../../../shared/components/LabeledInput";
import LabeledSelect from "../../../shared/components/LabeledSelect";

export default function StockFilterBar() {
    return (
        <section className="mb-10 border rounded px-3 py-2">
        <div className="flex items-center mb-4 gap-4">
            <LabeledSelect
                id="itemCategory"
                label="카테고리"
                // value={itemCategory}
                wrapperClassName="flex flex-col text-left gap-1"
                labelClassName="font-semibold block"
                selectClassName="border rounded px-6 py-2"
                // onChange={(e) => onChangeCategory(e.target.value)}
                options={[
                    { value: "", label: "전체" },
                    { value: "도우", label: "도우" },
                    { value: "치즈", label: "치즈" },
                    { value: "토핑", label: "토핑" },
                    { value: "소스", label: "소스" },
                    { value: "향신료", label: "향신료" },
                    { value: "야채", label: "야채" },
                    { value: "면", label: "면" },
                    { value: "사이드", label: "사이드" },
                    { value: "음료", label: "음료" }
                ]}
            />
            <LabeledSelect
                id="changeReason"
                label="변동 유형"
                // value={changeReason}
                wrapperClassName="flex flex-col text-left gap-1"
                labelClassName="font-semibold block"
                selectClassName="border rounded px-7 py-2"
                // onChange={(e) => onChangeReason(e.target.value)}
                options={[
                    { value: "", label: "전체" },
                    { value: "입고", label: "입고" },
                    { value: "판매", label: "판매" },
                    { value: "폐기", label: "폐기" },
                    { value: "조정", label: "조정" },
                ]}
            />
            <LabeledSelect
                id="searchCondition"
                label="검색 조건"
                // value={searchCondition}
                wrapperClassName="flex flex-col text-left gap-1"
                labelClassName="font-semibold block"
                selectClassName="border rounded px-5 py-2"
                // onChange={(e) => onChangeSearchCondition(e.target.value)}
                options={[
                    { value: "품목 명", label: "품목 명" },
                    { value: "품목 코드", label: "품목 코드" }
                ]}
            />
            <div className="flex items-end gap-1">
            <LabeledInput
                label="검색어"
                // value={searchKeyword}
                type="text"
                // onChange={e => setField("searchKeyword", e.target.value)}
                wrapperClassName="flex-col"
                labelClassName="text-left block"
                inputClassName="border rounded px-7 py-2.5"
            />
            <Button className="yellow-btn py-2 whitespace-nowrap">검색</Button>
            <Button className="white-btn py-2 whitespace-nowrap">초기화</Button>
            </div>
        </div>
        </section>
    );
}