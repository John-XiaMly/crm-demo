import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button, HStack, Icon, NativeSelect, Stack, Table, Text } from "@chakra-ui/react";
import { LuArrowDown, LuArrowUp, LuChevronsUpDown } from "react-icons/lu";

export const CustomTable = ({ columns, data, sorting, onSortingChange, page, onPageChange, pageSize, onPageSizeChange, totalElements, totalPages }) => {

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: onSortingChange,
        pageCount: Math.ceil(totalElements / pageSize),
        manualPagination: true,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel()
    });

    const getPagination = (currentPage) => {
        const rangeWithDots = [];

        if (totalPages <= 7) {
            // 頁數很少就全列
            for (let i = 0; i < totalPages; i++) {
                rangeWithDots.push(i);
            }
        } else {
            // 當你在前 4 頁時：顯示 1 2 3 4 5 ... 102
            if (currentPage < 4) {
                rangeWithDots.push(0, 1, 2, 3, 4, '...', totalPages - 1);
            }
            // 當你在最後 4 頁時：顯示 1 ... 98 99 100 101 102
            else if (currentPage > totalPages - 5) {
                rangeWithDots.push(0, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
            }
            // 當你在中間時：顯示 1 ... 49 50 51 ... 102
            else {
                rangeWithDots.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
            }
        }
        return rangeWithDots;
    }

    return (
        <>
            <Stack gap="4" p="4" bg="white" borderRadius="md" shodow="sm">
                <HStack justifyContent="space-between">
                    <HStack gap="2">
                        <Text>顯示</Text>
                        <NativeSelect.Root width="80px">
                            <NativeSelect.Field value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                        <Text>筆結果</Text>
                    </HStack>
                </HStack>

                <Table.Root variant="outlined">
                    <Table.Header>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    const sortStatus = header.column.getIsSorted();
                                    return (
                                        <Table.ColumnHeader key={header.id}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            cursor={header.column.getCanSort() ? "pointer" : "default"}
                                                            _hover={header.column.getCanSort() ? { bg: "gray.50" } : {}}
                                        >
                                            <HStack gap={2}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <Icon color="gray.400">
                                                        {sortStatus === "asc" ? <LuArrowUp /> :
                                                            sortStatus === "desc" ? <LuArrowDown /> :
                                                                <LuChevronsUpDown />}
                                                    </Icon>
                                                )}
                                            </HStack>
                                        </Table.ColumnHeader>
                                    )
                                })}
                            </Table.Row>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {table.getRowModel().rows.map(row => (
                            <Table.Row key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <Table.Cell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

                <HStack justifyContent="space-between">
                    <Text color="gray.600" fontSize="sm">
                        顯示第 {page * pageSize + 1} 至 {Math.min((page + 1) * pageSize, totalElements)} 筆結果，共 {totalElements} 筆
                    </Text>
                    <HStack gap="1">
                        <Button variant="outline" size="sm" onClick={() => onPageChange(0)} disabled={page === 0}>第一頁</Button>
                        <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page === 0}>上一頁</Button>
                        { getPagination(page).map((item, index) => {
                            if (item === "...") {
                                return <Button
                                    key={`dot-${index}`}
                                    variant="outline"
                                    colorPalette="blue"
                                    size="sm"
                                    disabled
                                >
                                    {item}
                                </Button>
                            }
                            return (
                                <Button
                                    key={item}
                                    variant={page === item ? "solid" : "outline"}
                                    colorPalette="blue"
                                    size="sm"
                                    onClick={() => onPageChange(item)}
                                >
                                    {item + 1}
                                </Button>
                            )
                        }) }
                        <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={(page + 1) * pageSize >= totalElements}>下一頁</Button>
                        <Button variant="outline" size="sm" onClick={() => onPageChange(Math.ceil(totalElements / pageSize) - 1)} disabled={(page + 1) * pageSize >= totalElements}>最後一頁</Button>
                    </HStack>
                </HStack>
            </Stack>
        </>
    );
}