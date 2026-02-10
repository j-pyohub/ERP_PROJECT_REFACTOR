import { use, useEffect } from "react";
import { useAxios } from "../../../shared/hooks/useAxios";
import type { Menu } from "../types/Menu";
import { MenuImageGrid } from "./MenuImageGrid";

interface MenuImageGridViewProps {
    menuCategory: string;
    releaseStatus: string;
}

function MenuImageGridView({menuCategory, releaseStatus}: MenuImageGridViewProps) {
    const {data, loading, error, request } = useAxios<Menu[]>();
    useEffect(() => {
        request({
            url: "/menu/menuList",
            method: "GET",
            params: {
            menuCategory: menuCategory || undefined,
            releaseStatus: releaseStatus || undefined,
            },
        });
    }, [menuCategory, releaseStatus, request]);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;
    if (!data) return null;
    
    return (
        <div className="tab-content-area image scroll-area">
            <MenuImageGrid menus={data} />
        </div>
    )
};
export default MenuImageGridView;