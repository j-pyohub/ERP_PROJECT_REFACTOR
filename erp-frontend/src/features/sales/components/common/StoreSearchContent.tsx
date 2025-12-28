import { useEffect, useMemo, useState } from "react";
import Button from "../../../../shared/components/Button";
import PaginationContainer from "../../../../shared/components/PaginationForm";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
} from "../../../../shared/components/Table";
import { fetchStoreList } from "../../apis/salesApi";
import type { Store } from "../../types/Store";

type Props = {
    onSelect: (storeNo: number, storeName: string) => void;
};

const PAGE_SIZE = 5;

export default function StoreSearchContent({ onSelect }: Props) {

    const [stores, setStores] = useState<Store[]>([]);
    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchStoreList().then((res) => {
            setStores(res.data);
        });
    }, []);

    const filteredStores = useMemo(() => {
        if (!keyword) return stores;

        return stores.filter((store) =>
            store.storeName.includes(keyword)
        );
    }, [stores, keyword]);

    const pagedStores = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredStores.slice(start, start + PAGE_SIZE);
    }, [filteredStores, page]);

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="직영점명 검색"
                    className="border rounded px-2 py-1 h-9 w-60"
                />
            </div>

            <Table gridColumns="80px 180px 1fr 80px">
                <TableHeader columns={["번호", "직영점명", "주소", "선택"]} />

                {pagedStores.length === 0 && (
                    <TableRow>
                        <TableCell>
                            <span className="text-gray-500">데이터가 없습니다.</span>
                        </TableCell>
                    </TableRow>
                )}

                {pagedStores.map((store, idx) => (
                    <TableRow key={store.storeNo}>
                        <TableCell>
                            {(page - 1) * PAGE_SIZE + idx + 1}
                        </TableCell>
                        <TableCell>{store.storeName}</TableCell>
                        <TableCell>{store.address}</TableCell>
                        <TableCell>
                            <Button
                                className="yellow-btn h-8 px-3"
                                onClick={() =>
                                    onSelect(store.storeNo, store.storeName)
                                }
                            >
                                선택
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <PaginationContainer
                totalCount={filteredStores.length}
                pageSize={PAGE_SIZE}
                currentPage={page}
                onPageChange={setPage}
            />
        </>
    );
}
