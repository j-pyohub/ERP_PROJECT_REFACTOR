import StoreMenuFilterBar from "../components/StoreMenuFilterBar";
import StoreMenuListTableView from "../components/StoreMenuListTableView";
import StoreMenuStatusModal from "../components/StoreMenuStatusModal";

function StoreMenuListPage() {
    return (
        <>
            <div className="ccontainer custom-container mt-5 my-5">
                <div className="bg-white border rounded p-5">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-4">직영점별 판매 메뉴</h2>
                    </div>
                    <StoreMenuFilterBar />
                    <StoreMenuListTableView />
                </div>
            </div>
            <StoreMenuStatusModal />


        </>
    );
}

export default StoreMenuListPage;