import { Typography } from "@mui/material";
import { Card, Heading, Box, Text, Button, Flex, SimpleGrid, Stack, ButtonGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import {adminDeleteCustomer, getCustomerById} from "@/api/Modules/customer.js";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { Users, CornerDownLeft, Trash2, Edit } from "lucide-react"
import { useTranslation } from "react-i18next";
import { CustomDialog } from "@/components/customDialog/index.jsx";
import { SystemInfoPopover } from "@/components/customerPopover/index.jsx";

export const ViewCustomer = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getCustomerById(id).then(response => {
            setCustomer(response.data);
        }).catch(error => {
            enqueueSnackbar(error, { variant: "error" });
            navigate("/customers");
        });
    }, []);

    // Notistack hook for notifications
    const { enqueueSnackbar} = useSnackbar();

    const { t: t } = useTranslation();
    const { t: tCustomer } = useTranslation("translation", { keyPrefix: "customer" });

    const handleDelete = async () => {
        try {
            const response = await adminDeleteCustomer(id);
            if ([200, 201].includes(response.status)) {
                enqueueSnackbar(response.data, { variant: "success" });
                navigate("/customers");
            } else {
                enqueueSnackbar(response.data, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(error, { variant: "error" });
        } finally {
            setDeleteDialogOpen(false);
        }
    }

    return (
        <Box>
            <Box sx={{mb: 3}}>
                <Typography variant="h4" sx={{fontWeight: "600"}}>
                    {tCustomer("title", "客戶管理")}
                </Typography>
            </Box>

            <Box p={2}>
                <Card.Root>
                    <Card.Header>
                        <Flex justify="space-between" align="center" wrap="wrap" gap="4">
                            <Heading size="md" display="flex" alignItems="center" gap="2" color="blue">
                                <Users></Users>
                                <Text>{tCustomer("dataTitle", "客戶資料")}</Text>
                            </Heading>
                        </Flex>
                    </Card.Header>
                    <Card.Body>
                        <Box p="6">
                            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {tCustomer("name", "客戶名稱")}
                                    </Text>
                                    <Text>{customer.name}</Text>
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {tCustomer("taxId", "客戶統編")}
                                    </Text>
                                    <Text>{customer.taxId}</Text>
                                </Stack>
                            </SimpleGrid>
                        </Box>
                        <Box p="6">
                            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {tCustomer("owner", "業務窗口")}
                                    </Text>
                                    <Text>{customer.owner}</Text>
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {tCustomer("phone", "客戶電話")}
                                    </Text>
                                    <Text>{customer.phone}</Text>
                                </Stack>
                            </SimpleGrid>
                        </Box>
                        <Box p="6">
                            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {tCustomer("contactOerson", "聯絡人")}
                                    </Text>
                                    <Text>{customer.contactPerson}</Text>
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {tCustomer("email", "email")}
                                    </Text>
                                    <Text>{customer.email}</Text>
                                </Stack>
                            </SimpleGrid>
                        </Box>
                        <Box p="6">
                            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {tCustomer("address", "地址")}
                                    </Text>
                                    <Text>{customer.address}</Text>
                                </Stack>
                            </SimpleGrid>
                        </Box>
                    </Card.Body>
                </Card.Root>

                <CustomDialog
                    open={deleteDialogOpen}
                    message={t("script.deleteConfirm", {
                        entity: t("message.customer", "客戶"),
                        defaultValue: "確定刪除此客戶 ?" }
                    )}
                    onClose={() => setDeleteDialogOpen(false)}
                    onConfirm={handleDelete} />

                <div className="fixed-bottom">
                    <ButtonGroup size="sm" variant="surface">
                        <Button
                            size="md"
                            colorPalette="green"
                            onClick={() => navigate(`/customers/${id}/edit`)}
                        >
                            <Edit />
                            {t("button.edit", "編輯")}
                        </Button>
                        <Button
                            size="md"
                            colorPalette="red"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            <Trash2 />
                            {t("button.delete", "刪除")}
                        </Button>
                        <Button
                            size="md"
                            colorPalette="gray"
                            onClick={() => navigate("/customers")}
                        >
                            <CornerDownLeft />
                            {t("button.return", "返回")}
                        </Button>

                        <SystemInfoPopover data={customer} />
                    </ButtonGroup>
                </div>
            </Box>

        </Box>
    );
};

export default ViewCustomer;
