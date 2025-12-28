import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";

type Props = {
    labels: string[];
    values: number[];
};

export default function MenuRatioChart({ labels, values }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);


    const chartData = useMemo(() => {
        const combined = labels.map((label, idx) => ({
            label,
            value: values[idx] ?? 0,
        }));

        combined.sort((a, b) => b.value - a.value);

        const top5 = combined.slice(0, 5);
        const others = combined.slice(5);

        if (others.length > 0) {
            const othersSum = others.reduce(
                (sum, item) => sum + item.value,
                0
            );

            top5.push({
                label: "기타",
                value: othersSum,
            });
        }

        return {
            labels: top5.map((x) => x.label),
            values: top5.map((x) => x.value),
        };
    }, [labels, values]);


    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "doughnut",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        data: chartData.values,
                    },
                ],
            },
            options: {
                responsive: true,
            },
        });
    }, [chartData]);

    return <canvas ref={canvasRef} height={250} />;
}
