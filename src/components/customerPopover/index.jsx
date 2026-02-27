import { Button, Popover, Portal, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Settings } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const SystemInfoPopover = ({ data }) => {
    const [open, setOpen] = useState(false);
    const { createdBy, createdAt, modifiedBy, modifiedAt } = data;
    const { t } = useTranslation();

    return (
        <Popover.Root open={open} positioning={{ placement: "top" }}>
            <Popover.Trigger>
                <Button size="md" colorPalette="cyan" onClick={() => setOpen(!open)}>
                    <Settings />
                    {t("button.systemInfo", "系統資訊")}
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content>
                        <Popover.Body>
                            <SimpleGrid columns={{ base: 1, lg: 1 }} gap={{ base: 4, lg: 10 }}>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {t("data.createdBy", "建立者")}
                                    </Text>
                                    <Text>{createdBy ?? "-"}</Text>
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {t("data.createdAt", "建立時間")}
                                    </Text>
                                    <Text>{createdAt ?? "-"}</Text>
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {t("data.modifiedBy", "修改者")}
                                    </Text>
                                    <Text>{modifiedBy ?? "-"}</Text>
                                </Stack>
                                <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} gap={2}>
                                    <Text fontWeight="semibold" minW={{ md: "100px" }} whiteSpace="nowrap">
                                        {t("data.modifiedAt", "修改時間")}
                                    </Text>
                                    <Text>{modifiedAt ?? "-"}</Text>
                                </Stack>
                            </SimpleGrid>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
}