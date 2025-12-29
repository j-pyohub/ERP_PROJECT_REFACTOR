import { useState } from "react";
import Button from "../../../shared/components/Button";
import useNavigateTo from "../../../shared/hooks/useNavigateTo";
import MenuFilterBar from "../components/MenuFilterBar";
import MenuImageGridView from "../components/MenuImageGridView";
import MenuTableView from "../components/MenuTableView";

function MenuListPage() {
    const goToStoreMenu = useNavigateTo()("/store-menu");
    const goToMenuAdd = useNavigateTo()("/menu/add");
    const [menuCategory, setMenuCategory] = useState("");
    const [releaseStatus, setReleaseStatus] = useState("");

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <h2 className="font-bold mr-4">메뉴 조회</h2>
                </div>
                <div>
                    <Button className="me-2 yellow-btn" onClick = {goToMenuAdd}>메뉴 등록</Button>
                    <Button className="me-2 yellow-btn" onClick={goToStoreMenu}>판매 메뉴 보기</Button>
                </div>
            </div>
        <MenuFilterBar  menuCategory={menuCategory}
                        releaseStatus={releaseStatus}
                        onChangeCategory={setMenuCategory}
                        onChangeStatus={setReleaseStatus} />
        <MenuTableView menuCategory={menuCategory} releaseStatus={releaseStatus} />
        <MenuImageGridView />
        </>
    );
}
export default MenuListPage;