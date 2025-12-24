import { LabeledInput } from "../../../shared/components/LabeledInput";
import { LabeledInputWithAddon } from "../../../shared/components/LabeledInputAddon";
import LabeledSelect from "../../../shared/components/LabeledSelect";

interface MenuBasicInfoSectionProps {
  sizeYn: "Y" | "N";
  onChangeSizeYn: (v: "Y" | "N") => void;
}

export function MenuBasicInfoSection({sizeYn, onChangeSizeYn}:MenuBasicInfoSectionProps){
    
    return(
            <section className="mb-10 border rounded px-3 py-2">
            <h3 className="text-lg text-left font-semibold mt-4 mb-4">기본 정보</h3>

            <div className="grid grid-cols-12 gap-6">
                <LabeledSelect

                    id="category"
                    label="카테고리"
                    options={[
                        { label: "피자", value: "피자" },
                        { label: "사이드디시", value: "사이드디시" },
                        { label: "음료", value: "음료" },
                        { label: "기타", value: "기타" }
                    ]}
                    wrapperClassName="col-span-4"
                    labelClassName="font-semibold text-left block mb-1"
                    selectClassName="w-full border rounded px-3 py-2"
                />
                <LabeledInput
                label="메뉴 코드"
                id="menuCode"
                type="text"
                wrapperClassName="col-span-4"
                labelClassName="font-semibold text-left block mb-1"
                inputClassName="w-full border rounded px-3 py-2"
                />
                <LabeledInput
                label="메뉴 명"
                id="menuName"
                type="text"
                wrapperClassName="col-span-4"
                labelClassName="font-semibold text-left block mb-1"
                inputClassName="w-full border rounded px-3 py-2"
                />
                <div className="col-span-4">
                <label className="font-semibold text-left block mb-1">사이즈</label>
                <div className="flex gap-20">
                    <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={sizeYn === "Y"}
                        onChange={() => onChangeSizeYn("Y")}
                    />
                    유
                    </label>
                    <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={sizeYn === "N"}
                        onChange={() => onChangeSizeYn("N")}
                    />
                    무
                    </label>
                </div>
                </div>


                {/* 가격 */}
                {sizeYn === "Y" ? (
                <>
                    <LabeledInputWithAddon
                        label="라지 가격"
                        id="largePrice"
                        type="number"
                        addon="원"
                        wrapperClassName="col-span-4"
                        labelClassName="font-semibold text-left block mb-1"
                        inputClassName="w-full border rounded-l px-3 py-2"
                        addonClassName="border rounded-r px-3 py-2 bg-gray-100"
                    />
                    <LabeledInputWithAddon
                        label="미디움 가격"
                        id="mediumPrice"
                        type="number"
                        addon="원"
                        wrapperClassName="col-span-4"
                        labelClassName="font-semibold text-left block mb-1"
                        inputClassName="w-full border rounded-l px-3 py-2"
                        addonClassName="border rounded-r px-3 py-2 bg-gray-100"
                    />
                </>
                ) : (
                    <LabeledInputWithAddon
                    label="판매 가격"
                    id="price"
                    type="number"
                    addon="원"
                    wrapperClassName="col-span-4"
                    labelClassName="font-semibold text-left block mb-1"
                    inputClassName="w-full border rounded-l px-3 py-2"
                    addonClassName="border rounded-r px-3 py-2 bg-gray-100"
                    />
                )}
                

                {/* 설명 */}
                <div className="col-span-12">
                <label className="font-semibold block mb-1">설명</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3} />
                </div>

                {/* 출시 상태 */}
                <LabeledSelect
                    id="releaseStatus"
                    label="출시 상태"
                    options={[
                    { label: "출시 예정", value: "planned" },
                    { label: "출시 중", value: "released" },
                    { label: "출시 중지", value: "discontinued" }
                    ]}
                    wrapperClassName="col-span-4"
                    labelClassName="font-semibold text-left block mb-1"
                    selectClassName="w-full border rounded px-3 py-2"
                />

                {/* 이미지 */}
                <LabeledInput
                    id="image"
                    label="대표 이미지"
                    type="file"
                    wrapperClassName="col-span-4"
                    labelClassName="font-semibold text-left block mb-1"
                    inputClassName="w-full border rounded px-3 py-2"
                />
            </div>
            </section>
    )
}