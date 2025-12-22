function StoreMenuStatusModal() {
    return (
        <div
        className="modal fade"
        id="statusSetModal"
        tabIndex={-1}
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title font-bold">판매 변경</h5>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                                data-bs-dismiss="modal"
                            >×</button>
                        </div>

                        <div className="modal-body">
                            <div className="flex mb-3">
                                <label className="w-1/4 font-semibold">메뉴 명</label>
                                <div className="flex-1">
                                    <span
                                        id="modalMenuName"
                                        className="inline-block bg-gray-100 text-gray-800 border px-3 py-2 rounded"
                                    ></span>
                                </div>
                            </div>

                            <div className="flex mb-2">
                                <label className="w-1/4 font-semibold">사이즈</label>
                                <label className="w-1/4 font-semibold">판매 상태</label>
                            </div>

                            <div id="modalSizeArea"></div>
                        </div>

                        <div className="modal-footer flex justify-end gap-2">
                            <button className="custom-btn" id="saveStatusBtn">
                                저장
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                data-bs-dismiss="modal"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
                                
            </div>
    );
}
export default StoreMenuStatusModal;