import type { Menu } from "../types/Menu";
import { groupByMenuCode } from "../../../shared/utils/groupByMenuCode";
import { MenuTableRow } from "./MenuTableRow";

export function MenuTableBody({ menus }: { menus: Menu[] }) {
  const grouped = groupByMenuCode(menus);

  return (
    <>
      {Object.values(grouped).map(group => (
        <MenuTableRow key={group[0].menuCode} group={group} />
      ))}
    </>
  );
}
