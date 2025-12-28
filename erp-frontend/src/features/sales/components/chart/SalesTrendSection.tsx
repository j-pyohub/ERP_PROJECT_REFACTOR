import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

type Props = {
    labels: string[];
    values: number[];
};

export default function SalesTrendSection({ labels, values }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "매출액",
                        data: values,
                        borderColor: "#0d6efd",
                        backgroundColor: "rgba(13,110,253,0.15)",
                        fill: true,
                    },
                ],
            },
        });
    }, [labels, values]);

    return (
        <div className="section-box mb-4">
            <h6 className="fw-bold mb-3">전체 매출 추이</h6>
            <canvas ref={canvasRef} height={90} />
        </div>
    );
}
