import { Table, TableBody, TableHeader } from "../../../shared/components/Table";

function StoreMenuListTableView() {
    const columns = [
        '직영점', '메뉴 코드', '메뉴 명', '사이즈', '가격', '판매 상태', '상태 변경', <input key="checkbox" type="checkbox" id="checkAll"/>
    ];

    return (
        <>
            <div className="text-right pb-1">
                <button className="custom-btn" id="statusSetAllBtn">
                    선택 일괄 변경
                </button>
            </div>

            <div className="scroll-area">
                <Table className = "text-center">
                    <TableHeader columns={columns}/>
                    <TableBody id="storeMenuTableBody"/>
                </Table>
            </div>
        </>         
    );
}

export default StoreMenuListTableView;