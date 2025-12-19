import Button from "../../../shared/components/Button";
import useNavigateTo from "../../../shared/hooks/useNavigateTo";
import MenuFilterBar from "../components/MenuFilterBar";
import MenuImageGridView from "../components/MenuImageGridView";
import MenuListTableView from "../components/MenuListTableView";

function MenuListPage() {
    const goToStoreMenu = useNavigateTo()("/store-menu");
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">메뉴 조회</h2>
            </div>
            <div>
                <Button className="btn me-2 custom-btn" onClick = {()=> alert('메뉴 등록버튼')}>메뉴 등록</Button>
                <Button className="btn me-2 custom-btn" onClick={goToStoreMenu}>판매 메뉴 보기</Button>
            </div>

        <MenuFilterBar />
        <MenuListTableView />
        <MenuImageGridView />
        </>
    );
}
export default MenuListPage;