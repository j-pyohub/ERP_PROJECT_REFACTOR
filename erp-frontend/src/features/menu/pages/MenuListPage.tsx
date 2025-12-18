import MenuFilterBar from "../components/MenuFilterBar";
import MenuImageGridView from "../components/MenuImageGridView";
import MenuListTableView from "../components/MenuListTableView";

function MenuListPage() {
    return (
        <div className="container custom-container mt-5 my-5">
    <div className="bg-white border rounded p-5">
        {/* 제목 / 버튼 */}
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">메뉴 조회</h2>
            <div>
                <button className="btn btn-warning me-2 custom-btn" id="menuAddBtn">메뉴 등록</button>
                <button className="btn custom-btn" id="storeMenuBtn">판매 메뉴 보기(본사)</button>
                <button className="btn custom-btn" id="storeMenuBtnStore">판매 메뉴 보기(직영점)</button>
            </div>
        </div>

        <MenuFilterBar />
        <MenuListTableView />
        <MenuImageGridView />
    </div>
</div>
    );
}
export default MenuListPage;