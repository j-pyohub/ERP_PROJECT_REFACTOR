import { useState } from "react";
import { LabeledInput } from "../../../shared/components/LabeledInput";
import { LabeledInputWithAddon } from "../../../shared/components/LabeledInputAddon";
import LabeledSelect from "../../../shared/components/LabeledSelect";
import { MenuIngredientModal } from "../components/menuIngredientModal/MenuIngredientModal";
import Button from "../../../shared/components/Button";

export default function MenuCreate() {
  const [sizeYn, setSizeYn] = useState<"Y" | "N">("Y");
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = ()=>setIsOpen(false);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">메뉴 등록</h2>
          <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
            목록
          </button>
        </div>

        <section className="mb-10">
          <h5 className="font-bold mb-6">기본 정보</h5>

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
                    onChange={() => setSizeYn("Y")}
                  />
                  유
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={sizeYn === "N"}
                    onChange={() => setSizeYn("N")}
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

        {/* 레시피 */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold">레시피(재료) 정보</h5>
            <Button className="yellow-btn" onClick={()=> setIsOpen(true)}>
              + 재료 불러오기
            </Button>
          </div>

          <table className="w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">품목코드</th>
                <th className="border p-2">재료명</th>
                <th className="border p-2">단위</th>
                {sizeYn === "Y" ? (
                  <>
                    <th className="border p-2">라지 정량</th>
                    <th className="border p-2">미디움 정량</th>
                  </>
                ) : (
                  <th className="border p-2">정량</th>
                )}
                <th className="border p-2">삭제</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </section>

        {/* 버튼 */}
        <div className="flex justify-center gap-4">
          <Button className="yellow-btn">
            등록
          </Button>
          <Button className="white-btn">
            초기화
          </Button>
        </div>
      </div>

      {/* 모달 */}
      {isOpen && <MenuIngredientModal onClose={handleClose} />}
    </div>
  );
}
