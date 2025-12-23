import type { Menu } from "../../features/menu/types/Menu";


export function groupByMenuCode(menuList: Menu[]) {
  return menuList.reduce<Record<string, Menu[]>>((acc, menu) => {
    acc[menu.menuCode] ??= [];
    acc[menu.menuCode].push(menu);
    return acc;
  }, {});
}