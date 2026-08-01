import React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  emptyText?: string;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyText = "No items found.",
  className,
}: DataTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border border-slate bg-navy/30 p-12 text-center text-sm text-muted-foreground">
        {emptyText}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-slate bg-navy/40 shadow-soft-md", className)}>
      <table className="w-full text-left text-sm text-muted-foreground border-collapse">
        <thead className="border-b border-slate bg-navy/80 text-xs font-semibold uppercase tracking-wider text-white">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={cn("px-6 py-4", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate/40">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="hover:bg-slate/30 transition-colors duration-150"
            >
              {columns.map((col, idx) => (
                <td key={idx} className={cn("px-6 py-4 font-medium text-white", col.className)}>
                  {col.cell
                    ? col.cell(item)
                    : col.accessorKey
                    ? (item[col.accessorKey] as React.ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
