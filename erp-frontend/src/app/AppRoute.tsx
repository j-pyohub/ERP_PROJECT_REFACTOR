import MenuListPage from "../features/menu/pages/MenuListPage";
import StoreMenuListPage from "../features/storeMenu/pages/StoreMenuListPage";

function AppRoute() {
    return (
        <div>
            <MenuListPage />
            <StoreMenuListPage />
        </div>
    );
}
export default AppRoute;