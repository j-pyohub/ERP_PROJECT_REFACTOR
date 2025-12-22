import type { Menu } from "../types/Menu";
import { groupByMenuCode } from "../../../shared/utils/groupByMenuCode";
import { MenuGroupRow } from "./MenuGroupRow";

export function MenuGroupTable({ menus }: { menus: Menu[] }) {
  const grouped = groupByMenuCode(menus);

  return (
    <>
      {Object.values(grouped).map(group => (
        <MenuGroupRow key={group[0].menuCode} group={group} />
      ))}
    </>
  );
}
