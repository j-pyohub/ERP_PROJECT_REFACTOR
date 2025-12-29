type Props = {
    title: string;
    value: string | number;
};

export default function KpiCard({ title, value }: Props) {
    return (
        <div className="kpi-card">
            <div className="kpi-title">{title}</div>
            <div className="kpi-value">{value}</div>
        </div>
    );
}