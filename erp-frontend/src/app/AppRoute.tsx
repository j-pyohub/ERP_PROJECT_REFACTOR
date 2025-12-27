import { BrowserRouter, Route, Routes } from "react-router";
import MenuListPage from "../features/menu/pages/MenuListPage";
import StoreMenuListPage from "../features/storeMenu/pages/StoreMenuListPage";
import PageLayout from "../shared/components/PageLayout";
import SalesPage from "../features/sales/pages/SalesPage";
import LoginPage from "../features/login/pages/LoginPage";
import MenuAddPage from "../features/menu/pages/MenuAddPage";
import TestPage from "../features/test/TestPage";
import ItemPage from "../features/item/ItemPage";

function AppRoute() {
    return (
        <BrowserRouter basename="/react">
            <Routes>
                <Route path="/auth/login" element={<PageLayout showHeader={false}><LoginPage /></PageLayout>} />
                <Route path="/sales" element={<PageLayout><SalesPage /></PageLayout>} />
                <Route path="/menu" element={<PageLayout><MenuListPage /></PageLayout>} />
                <Route path="/store-menu" element={<PageLayout><StoreMenuListPage /></PageLayout>} />
                <Route path="/menu/add" element={<PageLayout><MenuAddPage /></PageLayout>} />
                <Route path="/item" element={<PageLayout><ItemPage /></PageLayout>} />
                <Route path="/test" element={<PageLayout><TestPage /></PageLayout>} />
            </Routes>
        </BrowserRouter>

    );
}
export default AppRoute;