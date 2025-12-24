import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

type Props = {
    labels: string[];
    values: number[];
};

export default function StoreTop5Chart({ labels, values }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "매출 금액",
                        data: values,
                    },
                ],
            },
            options: {
                indexAxis: "y",
                responsive: true,
            },
        });
    }, [labels, values]);

    return <canvas ref={canvasRef} height={250} />;
}
