import Button from "../../../shared/components/Button";

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

            <div className="toggle-group">
                <Button
                    className={`toggle-btn ${viewMode === "chart" ? "active" : ""}`}
                    onClick={() => onChange("chart")}
                >
                    차트
                </Button>

                <Button
                    className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
                    onClick={() => onChange("list")}
                >
                    목록
                </Button>
            </div>
        </div>
    );
}
