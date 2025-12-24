import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

type Props = {
    labels: string[];
    values: number[];
};

export default function MenuRatioChart({ labels, values }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "doughnut",
            data: {
                labels,
                datasets: [
                    {
                        data: values,
                    },
                ],
            },
            options: {
                responsive: true,
            },
        });
    }, [labels, values]);

    return <canvas ref={canvasRef} height={250} />;
}
