import Button from "../../../../shared/components/Button";
import { LabeledInput } from "../../../../shared/components/LabeledInput";
import LabeledSelect from "../../../../shared/components/LabeledSelect";

interface MenuFilterBarProps {
  itemCategory: string;
  searchCondition: string;
  onChangeCategory: (value: string) => void;
  onChangeCondition: (value: string) => void;
}

export function MenuIngredientFilterBar({
  itemCategory,
  searchCondition,
  onChangeCategory,
  onChangeCondition,
}: MenuFilterBarProps) {
    return (
    <div className="flex items-center mb-4 gap-4">
        <LabeledSelect
            id="itemCategory"
            label="카테고리"
            value={itemCategory}
            wrapperClassName="items-center gap-1"
            labelClassName="font-semibold block"
            selectClassName="border rounded px-3 py-2"
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
        id="searchCondition"
        label="검색 조건"
        wrapperClassName="items-center gap-1"
        labelClassName="font-semibold block"
        selectClassName="border rounded px-3 py-2"
        value={searchCondition}
        onChange={(e) => onChangeCondition(e.target.value)}
        options={[
          { value: "", label: "전체" },
          { value: "code", label: "품목 코드" },
          { value: "name", label: "재료 명" },
        ]}
      />

        <LabeledInput
            label="입력"
            id="modalSearchBtn"
            type="text"
            inputClassName="w-full border rounded px-3 py-2" />
        <Button className="yellow-btn ">
            검색
        </Button>
    </div>);
}
