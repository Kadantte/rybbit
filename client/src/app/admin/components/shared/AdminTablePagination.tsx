"use client";

import { Table } from "@tanstack/react-table";
import { TablePagination } from "@/components/pagination";

interface AdminTablePaginationProps<TData> {
  table: Table<TData>;
  data: { items: TData[]; total: number } | undefined;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (value: { pageIndex: number; pageSize: number }) => void;
  isLoading: boolean;
  itemName: string;
}

export function AdminTablePagination<TData>({
  table,
  data,
  pagination,
  setPagination,
  isLoading,
  itemName,
}: AdminTablePaginationProps<TData>) {
  return (
    <TablePagination
      table={table}
      data={data}
      pagination={pagination}
      setPagination={setPagination}
      isLoading={isLoading}
      itemName={itemName}
    />
  );
}
