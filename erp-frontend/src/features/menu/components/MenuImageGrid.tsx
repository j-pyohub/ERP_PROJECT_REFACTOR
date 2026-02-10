import { groupByMenuCode } from "../../../shared/utils/groupByMenuCode";
import type { Menu } from "../types/Menu";

export function MenuImageGrid({ menus }: { menus: Menu[] }) {
    const grouped = groupByMenuCode(menus);

    return (
        <div className="grid grid-cols-3 gap-4">
            {Object.values(grouped).map(group => {
                const first = group[0];
                return (
                    <div key={first.menuCode}>
                        <div 
                            className="border rounded p-2 bg-white shadow-sm text-center menuBox"
                            data-menu-no={first.menuNo}
                        >
                            {/* 이미지 */}
                            <img 
                                src={first.menuImage || 'https://via.placeholder.com/120'}
                                className="w-full h-30 object-cover mb-2 rounded"
                                alt={first.menuName}
                            />
                            
                            {/* 메뉴명 */}
                            <div className="font-bold mb-2">{first.menuName}</div>
                            
                            {/* 사이즈/가격/상태 박스 */}
                            <div className="text-center text-sm">
                                {group.map(menu => (
                                    <div
                                        key={menu.menuNo}
                                        className="flex justify-between items-center py-1 border-b"
                                    >
                                        <span className="font-semibold">{menu.size}</span>
                                        <span>{menu.menuPrice?.toLocaleString()}원</span>
                                        <span className="inline-block px-2 py-1 bg-gray-400 text-white rounded text-xs">
                                            {menu.releaseStatus}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )}