import { Typography, Paper } from "@mui/material";
import { Card, Heading, Box, Text, Input, Button, HStack, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import DynamicTable from "../../components/dynamicTable";
// import EditCustomerDialog from "./editCustomerDialog";
import { useState, useEffect} from "react";
import { getCustomers } from "@/api/Modules/customer.js";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Trash2, Users } from "lucide-react"

export const CustomersManagement = () => {
    // State for edit dialog
    const navigate = useNavigate();
    const [editDialogOpen, setEditDialogOpen] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    // State for customers data from API
    const [customersData, setCustomersData] = useState([]);

    // Notistack hook for notifications
    const {enqueueSnackbar} = useSnackbar();

    // Updated table headers for API data structure
    const tableHeaders = [
        {id: "id", title: "客戶編號", align: "left"},
        {id: "name", title: "客戶名稱", align: "left"},
        {id: "taxId", title: "客戶統編", align: "left"},
        {id: "owner", title: "業務窗口", align: "left"},
        {id: "phone", title: "客戶電話", align: "left"},
        {id: "contactPerson", title: "聯絡人", align: "left"},
        {id: "address", title: "地址", align: "left"},
        {id: "actions", title: "操作", align: "left"}
    ];

    // Updated columns to display
    const displayRows = [
        "id",
        "name",
        "taxId",
        "owner",
        "phone",
        "contactPerson",
        "address",
        "actions"
    ];

    const fetchAllCustomers = async () => {
        setLoading(true);

        try {
            const response = await getCustomers();
            if (response.status === 200 || response.status === 201) {
                console.log("response.data", response.data);
                // Transform API data to match table structure
                const transformedData = response.data.map(customer => ({
                    ...customer,

                    // id: customer._id,
                    // customerInfo: customer.name || "無資料",
                    // phone: customer.phone || "無資料",
                    // address: customer.address || "無資料",
                }));
                setCustomersData(transformedData);
            } else {
                console.error("Failed to fetch customers:", response.data);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            enqueueSnackbar("取得客戶資料失敗，請稍後再試。", {
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    // Action handlers
    const handleView = (customer) => {
        navigate(`/customer-history/${customer._id}`);
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setEditDialogOpen(true);
    };

    const handleDelete = (customer) => {
        console.log("Delete customer:", customer);
    };

    // Status change handler
    const handleStatusChange = (customerId, newStatus) => {
        setCustomersData((prevData) =>
            prevData.map((customer) =>
                customer._id === customerId || customer.id === customerId
                    ? {...customer, status: newStatus}
                    : customer
            )
        );
        console.log(`Customer ${customerId} status changed to: ${newStatus}`);
    };

    const [name, setName] = useState("");
    const [taxId, setTaxId] = useState("");
    const [owner, setOwner] = useState("");
    const [phone, setPhone] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [address, setAddress] = useState("");

    const handleChange = (e, field) => {
        const value = e.target.value;
        console.log(field);
        switch (field) {
            case "name":
                setName(value);
                break;
            case "taxId":
                setTaxId(value);
                break;
            case "owner":
                setOwner(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "contactPerson":
                setContactPerson(value);
                break;
            case "address":
                setAddress(value);
                break;
        }
    }

    const handleClear = () => {
        setName("");
        setTaxId("");
        setOwner("");
        setPhone("");
        setContactPerson("");
        setAddress("");
    }

    return (
        <Box>
            {/* Simple Header */}
            <Box sx={{mb: 3}}>
                <Typography variant="h4" sx={{fontWeight: "600"}}>
                    客戶管理
                </Typography>
                <Typography variant="body1" sx={{color: "#666"}}>
                    在這裡管理所有客戶
                </Typography>
            </Box>

            <Box p={2}>
                <Card.Root size="sm">
                    <Card.Header>
                        <Flex justify="space-between" align="center" wrap="wrap" gap="4">
                            <HStack wrap="wrap">
                                <Heading size="md" display="flex" alignItems="center" gap="2" color="blue">
                                    <Filter></Filter>
                                    <Text>條件式搜索</Text>
                                </Heading>
                            </HStack>
                            <HStack wrap="wrap">
                                <Button size="sm" colorPalette="red" variant="surface" onClick={handleClear}>
                                    <Trash2></Trash2>
                                    清除
                                </Button>
                            </HStack>
                        </Flex>
                    </Card.Header>
                    <Card.Body>

                        <Box p="4"> {/* 給內部一點內縮空間 */}
                            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        客戶名稱
                                    </Text>
                                    <Input placeholder="請輸入客戶名稱" flex="1" variant="outline" value={name} onChange={(e) => handleChange(e, "name")} />
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        客戶統編
                                    </Text>
                                    <Input placeholder="請輸入客戶統編" flex="1" variant="outline" value={taxId}  onChange={(e) => handleChange(e, "taxId")} />
                                </Stack>
                            </SimpleGrid>
                        </Box>
                        <Box p="4"> {/* 給內部一點內縮空間 */}
                            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        業務窗口
                                    </Text>
                                    <Input placeholder="請輸入業務窗口" flex="1" variant="outline" value={owner}  onChange={(e) => handleChange(e, "owner")} />
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        客戶電話
                                    </Text>
                                    <Input placeholder="請輸入客戶電話" flex="1" variant="outline" value={phone}  onChange={(e) => handleChange(e, "phone")} />
                                </Stack>
                            </SimpleGrid>
                        </Box>
                        <Box p="4"> {/* 給內部一點內縮空間 */}
                            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        聯絡人
                                    </Text>
                                    <Input placeholder="請輸入聯絡人" flex="1" variant="outline" value={contactPerson}  onChange={(e) => handleChange(e, "contactPerson")} />
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        地址
                                    </Text>
                                    <Input placeholder="請輸入地址" flex="1" variant="outline" value={address}  onChange={(e) => handleChange(e, "address")} />
                                </Stack>
                            </SimpleGrid>
                        </Box>
                    </Card.Body>
                </Card.Root>
            </Box>

            {/*</ListCard>*/}
            <Box p={2}>
                <Card.Root>
                    <Card.Header>
                        <Flex justify="space-between" align="center" wrap="wrap" gap="4">
                            <Heading size="md" display="flex" alignItems="center" gap="2" color="blue">
                                <Users></Users>
                                <Text>客戶列表</Text>
                            </Heading>
                            <HStack wrap="wrap">
                                <Button size="sm" colorPalette="green" variant="surface">
                                    <Plus></Plus>
                                    新增
                                </Button>
                            </HStack>
                        </Flex>
                    </Card.Header>
                    <Card.Body>
                        <Paper elevation={1} sx={{borderRadius: "8px"}}>
                            <DynamicTable
                                tableWidth={"100%"}
                                tableHeader={tableHeaders}
                                tableData={customersData}
                                displayRows={displayRows}
                                showPagination={true}
                                isLoading={loading}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                showDelete={true}
                                onStatusChange={handleStatusChange}
                                onView={handleView}
                            />
                        </Paper>
                    </Card.Body>
                </Card.Root>
            </Box>


            {/* Edit Customer Dialog */}
            {/*<EditCustomerDialog*/}
            {/*    open={editDialogOpen}*/}
            {/*    onClose={() => {*/}
            {/*        setEditDialogOpen(false);*/}
            {/*        setSelectedCustomer(null);*/}
            {/*    }}*/}
            {/*    customer={selectedCustomer}*/}
            {/*    onRefresh={fetchAllCustomers}*/}
            {/*/>*/}
        </Box>
    );
};

export default CustomersManagement;
