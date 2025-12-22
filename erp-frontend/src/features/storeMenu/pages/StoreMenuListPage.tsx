import StoreMenuFilterBar from "../components/StoreMenuFilterBar";
import StoreMenuListTableView from "../components/StoreMenuListTableView";
import StoreMenuStatusModal from "../components/StoreMenuStatusModal";

function StoreMenuListPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">직영점별 판매 메뉴</h2>
            </div>
            <StoreMenuFilterBar />
            <StoreMenuListTableView />
            <StoreMenuStatusModal />
        </>
    );
}

export default StoreMenuListPage;