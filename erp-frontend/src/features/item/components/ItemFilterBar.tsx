import { useState } from "react";
import Button from "../../../shared/components/Button";
import { LabeledInput } from "../../../shared/components/LabeledInput";
import LabeledSelect from "../../../shared/components/LabeledSelect";

interface ItemFilterBarProps {
  itemCategory: string;
  searchType: string;
  onChangeCategory: (value: string) => void;
  onChangeStatus: (value: string) => void;
  onSubmitKeyword: (value: string) => void;
}

export default function ItemFilterBar({
  itemCategory,
  searchType,
  onChangeCategory,
  onChangeStatus,
  onSubmitKeyword,
}: ItemFilterBarProps) {
    const [keyword, setKeyword] = useState<string>("");

    return (
    <div className="flex items-center mb-4 gap-4">
        <LabeledSelect
            id="menuCategory"
            label="카테고리"
            value={itemCategory}
            wrapperClassName="flex items-center gap-1"
            labelClassName="font-semibold block w-20"
            selectClassName="border rounded px-3 py-2 w-40"
            onChange={(e) => onChangeCategory(e.target.value)}
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
            id="releaseStatus"
            label="검색조건"
            wrapperClassName="flex items-center gap-1"
            labelClassName="font-semibold block w-20"
            selectClassName="border rounded px-3 py-2 w-40"
            value={searchType}
            onChange={(e) => onChangeStatus(e.target.value)}
            options={[
                { value: "", label: "전체" },
                { value: "품목코드", label: "품목코드" },
                { value: "재료명", label: "재료명" },
                { value: "공급사", label: "공급사" },
            ]}
        />
        <div className="flex flex-row gap-1">
            <div>
                <LabeledInput id="keyword" label="" labelClassName="" inputClassName="" placeholder="검색어 입력" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setKeyword(e.target.value)}/>
            </div>
            <Button className="me-2 yellow-btn" onClick={() => onSubmitKeyword(keyword)}>검색</Button>
        </div>
    </div>);
}