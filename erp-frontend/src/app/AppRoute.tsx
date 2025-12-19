import MenuListPage from "../features/menu/pages/MenuListPage";
import StoreMenuListPage from "../features/storeMenu/pages/StoreMenuListPage";
import PageLayout from "../shared/components/PageLayout";

function AppRoute() {
    return (
        <PageLayout>
            <MenuListPage />
            <StoreMenuListPage />
        </PageLayout>
    );
}
export default AppRoute;