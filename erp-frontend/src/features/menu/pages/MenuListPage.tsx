import Button from "../../../shared/components/Button";
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
                <Button className="btn me-2 custom-btn" onClick = {()=> alert('메뉴 등록버튼')}>메뉴 등록</Button>
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