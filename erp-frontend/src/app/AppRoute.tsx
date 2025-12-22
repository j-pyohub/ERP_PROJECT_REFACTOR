import { BrowserRouter, Route, Routes } from "react-router";
import MenuListPage from "../features/menu/pages/MenuListPage";
import StoreMenuListPage from "../features/storeMenu/pages/StoreMenuListPage";
import PageLayout from "../shared/components/PageLayout";
import SalesPage from "../features/sales/pages/SalesPage";
import LoginPage from "../features/login/pages/LoginPage";

function AppRoute() {
    return (
        <BrowserRouter basename="/react">
            <Routes>
                <Route path="/auth/login" element={<PageLayout showHeader={false}><LoginPage /></PageLayout>} />
                <Route path="/sales" element={<PageLayout><SalesPage /></PageLayout>} />
                <Route path="/menu" element={<PageLayout><MenuListPage /></PageLayout>} />
                <Route path="/store-menu" element={<PageLayout><StoreMenuListPage /></PageLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default AppRoute;