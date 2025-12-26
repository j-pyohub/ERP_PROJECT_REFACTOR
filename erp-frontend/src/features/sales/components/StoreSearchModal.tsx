import { useEffect, useMemo, useState } from "react";
import Button from "../../../shared/components/Button";
import PaginationContainer from "../../../shared/components/PaginationForm";
import { fetchStoreList } from "../apis/salesApi";
import type { Store } from "../../../shared/types/Store";

type Props = {
    open: boolean;
    onClose: () => void;
    onSelect: (storeNo: number, storeName: string) => void;
};

const PAGE_SIZE = 5;

export default function StoreSearchModal({
                                             open,
                                             onClose,
                                             onSelect,
                                         }: Props) {
    const [keyword, setKeyword] = useState("");
    const [stores, setStores] = useState<Store[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!open) return;

        fetchStoreList().then((res) => {
            setStores(res.data);
            setKeyword("");
            setPage(1);
        });
    }, [open]);

    const filteredStores = useMemo(() => {
        const kw = keyword.trim();
        if (!kw) return stores;

        const regex = new RegExp(kw, "i");
        return stores.filter(
            (s) => regex.test(s.storeName) || regex.test(s.address)
        );
    }, [stores, keyword]);

    const pagedStores = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredStores.slice(start, start + PAGE_SIZE);
    }, [filteredStores, page]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[720px] rounded-lg p-4 space-y-4">

                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-semibold text-lg">직영점 검색</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                <input
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                        setPage(1);
                    }}
                    placeholder="직영점명 또는 주소 검색"
                    className="border rounded px-3 py-2 w-full h-9"
                />

                <div className="border rounded max-h-[320px] overflow-y-auto">
                    {pagedStores.length === 0 && (
                        <div className="text-center py-6 text-gray-500">
                            직영점이 없습니다.
                        </div>
                    )}

                    {pagedStores.map((store) => (
                        <div
                            key={store.storeNo}
                            className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                                onSelect(store.storeNo, store.storeName);
                                onClose();
                            }}
                        >
                            <div className="font-medium">{store.storeName}</div>
                            <div className="text-sm text-gray-500">
                                {store.address}
                            </div>
                        </div>
                    ))}
                </div>

                <PaginationContainer
                    totalCount={filteredStores.length}
                    pageSize={PAGE_SIZE}
                    currentPage={page}
                    onPageChange={setPage}
                />

                <div className="flex justify-end">
                    <Button className="white-btn h-9 px-4" onClick={onClose}>
                        닫기
                    </Button>
                </div>
            </div>
        </div>
    );
}
