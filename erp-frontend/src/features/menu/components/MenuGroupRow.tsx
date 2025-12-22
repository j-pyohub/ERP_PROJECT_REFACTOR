import { TableRow, TableCell } from "../../../shared/components/Table";
import type { Menu } from "../types/Menu";

export function MenuGroupRow({ group }: { group: Menu[] }) {
  const first = group[0];
  const hasMultiple = group.length > 1;

  return (
    <>
      {/* 첫 행 */}
      <TableRow>
        <TableCell hideBottomBorder={hasMultiple}>{first.menuCategory}</TableCell>
        <TableCell hideBottomBorder={hasMultiple}>{first.menuCode}</TableCell>
        <TableCell hideBottomBorder={hasMultiple}>{first.menuName}</TableCell>
        <TableCell>{first.size}</TableCell>
        <TableCell>{first.menuPrice}</TableCell>
        <TableCell hideBottomBorder={hasMultiple}>{first.releaseStatus}</TableCell>
        <TableCell hideBottomBorder={hasMultiple}>상세</TableCell>
      </TableRow>

      {/* 나머지 행 */}
      {group.slice(1).map(menu => (
        <TableRow key={menu.menuNo}>
          <TableCell hideTopBorder hideText />
          <TableCell hideTopBorder hideText />
          <TableCell hideTopBorder hideText />
          <TableCell>{menu.size}</TableCell>
          <TableCell>{menu.menuPrice}</TableCell>
          <TableCell hideTopBorder hideText />
          <TableCell hideTopBorder hideText />
        </TableRow>
      ))}
    </>
  );
}
