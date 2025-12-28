import { useSearchParams } from "react-router-dom";
import SalesDetailSection from "../components/deatil/SalesDetailSection";

export default function SalesDetailPage() {
    const [params] = useSearchParams();

    const storeNo = Number(params.get("storeNo"));
    const salesDate = params.get("salesDate") ?? "";

    return (
        <>
            <SalesDetailSection
                storeNo={storeNo}
                salesDate={salesDate}
            />
        </>
    );
}
