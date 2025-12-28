import Button from "../../../shared/components/Button";
import { LabeledInput } from "../../../shared/components/LabeledInput";
import StockFilterBar from "../components/StockFilterBar";

export default function StoreStockPage() {
    return (
        <>
            <div className="flex items-end mb-8">
                <h2 className="font-bold mr-4">재고 조회</h2>

            </div>
            <div className="flex">
                <LabeledInput 
                    label="직영점 검색"
                    wrapperClassName="flex justify-end gap-2"
                    labelClassName="whitespace-nowrap"
                    inputClassName="border rounded h-10 px-4 w-[200px]"
                />
                <Button className="yellow-btn h-10 whitespace-nowrap">
                    검색
                </Button>
            </div>

            <StockFilterBar />
            {/* <StockTableView /> */}
        </>
    );
}