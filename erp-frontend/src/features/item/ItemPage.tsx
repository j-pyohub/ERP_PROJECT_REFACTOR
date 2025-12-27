import { useState } from "react";
import Button from "../../shared/components/Button";
import ItemFilterBar from "../item/components/ItemFilterBar"
import ItemTableView from "./components/ItemTableView";
import PaginatinoContainer from "../../shared/components/PaginationForm";

export default function ItemPage(){
    // const goToStoreMenu = useNavigateTo()("/store-menu");
    // const goToMenuAdd = useNavigateTo()("/menu/add");
    const [itemCategory, setItemCategory] = useState("");
    const [searchType, setSearchType] = useState("");
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalPage] = useState(1);
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <h2 className="font-bold mr-4">품목 조회</h2>
                </div>
                <div> 
                    <Button className="me-2 yellow-btn" >새 품목 등록</Button>
                </div>
            </div> 

            <ItemFilterBar itemCategory= {itemCategory} onChangeCategory={setItemCategory} searchType={searchType} onChangeStatus={setSearchType} onSubmitKeyword={setKeyword}/>
            <ItemTableView itemCategory={itemCategory} searchType={searchType} currentPage={currentPage} onTotalContentChange={setTotalPage} itemName={keyword}/>
            
            <PaginatinoContainer currentPage={currentPage} onPageChange={setCurrentPage} pageSize={10} totalCount={totalContent} />
            {/* <MenuImageGridView /> */}
        </>
    );
}