import Button from "../../../shared/components/Button";
import useNavigateTo from "../../../shared/hooks/useNavigateTo";
import MenuFilterBar from "../components/MenuFilterBar";
import MenuImageGridView from "../components/MenuImageGridView";
import MenuListTableView from "../components/MenuListTableView";

function MenuListPage() {
    const goToStoreMenu = useNavigateTo()("/api/store-menu");
    return (
        <>
            <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
                <h2 className="font-bold mr-4">메뉴 조회</h2>
            </div>
                <div>
                    <Button className="me-2 custom-btn" onClick = {()=> alert('메뉴 등록버튼')}>메뉴 등록</Button>
                    <Button className="me-2 custom-btn" onClick={goToStoreMenu}>판매 메뉴 보기</Button>
                </div>
            </div>
        <MenuFilterBar />
        <MenuListTableView />
        <MenuImageGridView />
        </>
    );
}
export default MenuListPage;