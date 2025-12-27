type PaginationProps = {
  totalCount: number;        // 전체 데이터 수
  pageSize: number;          // 한 페이지에 보여줄 개수
  currentPage: number;       // 현재 페이지
  onPageChange: (page: number) => void;
};

export default function PaginationContainer({
    totalCount,
    pageSize,
    currentPage,
    onPageChange,
}: PaginationProps){

    const totalPages = Math.ceil(totalCount / pageSize);
    const currentArea = Math.floor((currentPage - 1) / pageSize) * 10 + 1;
    const endPage = Math.min(currentArea + pageSize - 1, totalPages);
    const pageCount = endPage - currentArea + 1;


    if (totalPages <= 1) return null;
    
    return (
        <div className="flex justify-center">
            {/* 이전 */}
            <button
                className="px-3 py-1 border border-gray-300 rounded-sm rounded-l-lg disabled:opacity-40 cursor-pointer hover:bg-gray-100"
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(1, currentArea - 10))}
            >
                이전
            </button>

            {/* 페이지 번호 */}
            {Array.from({ length: pageCount }, (_, i) => currentArea + i).map(page => (
                <button
                key={page}
                className={`px-3 py-1 cursor-pointer rounded-sm border-t border-b border-gray-300
                    ${currentPage === page ? "bg-yellow-500 text-white hover:bg-yellow-6" : "hover:bg-gray-100"}
                `}
                onClick={() => onPageChange(page)}
                >
                {page}
                </button>
            ))}

            {/* 다음 */}
            <button
                className="px-3 py-1 rounded-sm rounded-r-lg border-gray-300 disabled:opacity-40 cursor-pointer hover:bg-gray-100"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(Math.min(totalPages, currentArea + 10))}
            >
                다음
            </button>
        </div>
    );
}