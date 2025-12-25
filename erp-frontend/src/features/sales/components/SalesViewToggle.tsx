type Props = {
    viewMode: "chart" | "list";
    onChange: (mode: "chart" | "list") => void;
};

export default function SalesViewToggle({ viewMode, onChange }: Props) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
                보기
            </span>

            <div className="flex border rounded-md overflow-hidden">
                <button
                    onClick={() => onChange("chart")}
                    className={`px-3 py-1 text-sm transition
                        ${
                        viewMode === "chart"
                            ? "bg-yellow-400 text-black font-semibold"
                            : "bg-white text-gray-500 hover:bg-gray-100"
                    }`}
                >
                    차트
                </button>

                <button
                    onClick={() => onChange("list")}
                    className={`px-3 py-1 text-sm transition
                        ${
                        viewMode === "list"
                            ? "bg-yellow-400 text-black font-semibold"
                            : "bg-white text-gray-500 hover:bg-gray-100"
                    }`}
                >
                    목록
                </button>
            </div>
        </div>
    );
}
