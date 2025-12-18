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
                            <h5 className="modal-title fw-bold">판매 변경</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row mb-3">
                                <label className="col-3 fw-semibold">메뉴 명</label>
                                <div className="col">
                                    <span
                                        id="modalMenuName"
                                        className="badge bg-light text-dark border px-3 py-2"
                                    ></span>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="col-3 fw-semibold">사이즈</label>
                                <label className="col-3 fw-semibold">판매 상태</label>
                            </div>

                            <div id="modalSizeArea"></div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn custom-btn" id="saveStatusBtn">
                                저장
                            </button>
                            <button
                                className="btn btn-secondary"
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