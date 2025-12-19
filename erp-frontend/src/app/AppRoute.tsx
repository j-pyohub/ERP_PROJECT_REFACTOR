import { BrowserRouter, Route, Routes } from "react-router";
import MenuListPage from "../features/menu/pages/MenuListPage";
import StoreMenuListPage from "../features/storeMenu/pages/StoreMenuListPage";
import PageLayout from "../shared/components/PageLayout";

function AppRoute() {
    return (
        <BrowserRouter>
            <PageLayout>
                <MenuListPage />
                <Routes>
                <Route path="/store-menu" element={<StoreMenuListPage />} />
                </Routes>
            </PageLayout>
        </BrowserRouter>

    );
}
export default AppRoute;