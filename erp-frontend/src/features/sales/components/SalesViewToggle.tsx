type Props = {
    viewMode: "chart" | "list";
    onChange: (mode: "chart" | "list") => void;
};

function SalesViewToggle({ viewMode, onChange }: Props) {
    return (
        <div className="flex items-center mb-4">
            <span className="me-2">보기</span>
            <div className="btn-group">
                <button
                    className={`btn btn-sm ${
                        viewMode === "chart" ? "btn-warning" : "btn-outline-secondary"
                    }`}
                    onClick={() => onChange("chart")}
                >
                    차트
                </button>
                <button
                    className={`btn btn-sm ${
                        viewMode === "list" ? "btn-warning" : "btn-outline-secondary"
                    }`}
                    onClick={() => onChange("list")}
                >
                    목록
                </button>
            </div>
        </div>
    );
}

export default SalesViewToggle;
