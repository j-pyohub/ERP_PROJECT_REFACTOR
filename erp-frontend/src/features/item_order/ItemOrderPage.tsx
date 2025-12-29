import { useEffect } from "react";
import { useAxios } from "../../shared/hooks/useAxios";
import ItemTableView from "./components/Item/ItemTableView";
import ItemOrderProposalTableView from "./components/ItemOrderProposal/ItemOrderProposalTableView";
import { useItemOrderStore } from "./ItemOrderStore";
import { useNavigate } from "react-router";
import type { Item } from "./types/Item";
import ItemOrderSelectedTableView from "./components/ItemOrder/ItemOrderSelectedTableView";

export default function ItemOrderPage(){
    const { itemOrders } = useItemOrderStore();
    const { data, loading, error, request } = useAxios();
    const { data: itemList, request: requestItemList } = useAxios<Item[]>();
    const totalCount = itemOrders.length;
    const totalPrice = itemOrders.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const movePage = useNavigate();

    useEffect(() => {
        requestItemList({
            url: `/itemOrder/itemList/1`,
            method: "GET",
        });

        if (data) {
            movePage("/item");
        }
        if (error) {
            console.error("발주 요청 오류:", error);
            alert("발주 요청에 실패했습니다.");
        }
    }, [data, error]);

    const handleOrderRequest = async () => {
        if (itemOrders.length === 0) {
            alert("발주할 품목을 선택해주세요.");
            return;
        }

        const list = {
            storeNo: 1, // 필요 시 로그인 정보 등에서 가져오도록 수정
            totalItem: totalCount,
            totalAmount: totalPrice,
            orderList: itemOrders.map(order => ({
                itemNo: order.itemNo,
                itemQuantity: order.quantity,
                itemConvertStock: order.quantity * (order.convertStock || 0), // 수량 * 환산단위
                itemOrderPrice: order.price * order.quantity
            }))
        };

        request({
            url: `/itemOrder/itemOrder`,
            method: "POST",
            data: list
        });
    };

    return (
        <div className="flex flex-col h-full gap-2">
            <div className="flex flex-row justify-start">
                <h2 className="font-bold mr-4">발주 관리</h2>
            </div>
            <div className="top-section flex flex-row justify-center border rounded-lg flex-1 overflow-hidden">
                <div className="border rounded flex-1">
                    <div className="flex flex-row justify-start">
                        <h3 className="font-bold mr-4">발주 추천 목록</h3>
                        <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#proposalModal" id="item_proposal_history">
                            제안 내역
                        </button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                        <ItemOrderProposalTableView itemList={itemList || []} />
                    </div>
                </div>

                <div className="border rounded flex-1">
                    <div className="flex flex-row justify-start">
                        <h3 className="font-bold mr-4">발주 추천 목록</h3>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto">
                        <ItemOrderSelectedTableView />
                    </div>

                    <div className="flex flex-row justify-between align-items-center mt-3 pt-3 border-top">
                        <div>총 품목수: <strong><span id="total-cnt">{totalCount}</span><label>개</label></strong></div>
                        <div>총 발주액: <strong><span id="total-price">{totalPrice.toLocaleString()}</span><label>원</label></strong></div>
                        <button className="yellow-btn" id="order_request" onClick={handleOrderRequest}>발주 요청</button>
                    </div>
                </div>

            </div>
            <div className="bottom-section border rounded flex-1 flex flex-col overflow-hidden">

                <div className="panel flex flex-col h-full">
                    <div className="d-flex">
                        <div className="d-flex justify-content-center align-items-center">
                            <h5 className="fw-semibold me-3">재고 현황</h5>
                        </div>
                        <select className="form-select me-2" style={{width:150}} id="sort_select">
                            <option>기본순</option><option>추천순</option><option>하한선순</option>
                        </select>

                        <select className="form-select me-2" style={{width:150}} id="category_select">
                            <option>전체</option>
                            <option>도우</option>
                            <option>치즈</option>
                            <option>토핑</option>
                            <option>소스</option>
                            <option>향신료</option>
                            <option>야채</option>
                            <option>면</option>
                            <option>사이드</option>
                            <option>음료</option>
                        </select>

                        <input type="text" id="search-input" className="form-control me-2" style={{width:200}} placeholder="검색어 입력" />
                        <button id="search-btn" className="btn btn-warning">조회</button>
                    </div>

                    <div className="flex-1 scroll-area overflow-y-auto mt-3 max-h-[300px]">
                        <ItemTableView items={itemList || []} />
                    </div>

                </div>

            </div>
        </div>
    );
}