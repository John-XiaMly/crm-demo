import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CustomDialog = ({ open, message, onClose, onConfirm }) => {
    const { t } = useTranslation();

    return (
        <Dialog.Root size="xs" open={open} onClose={onClose}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header></Dialog.Header>
                        <Dialog.Body>
                            <p>{message}</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button size="sm" colorPalette="blue" variant="surface" onClick={() => onConfirm()}>
                                <Check />
                                {t("button.confirm", "確認")}
                            </Button>
                            <Dialog.ActionTrigger asChild>
                                <Button size="sm" varinat="surface" onClick={() => onClose()}>
                                    <X />
                                    {t("button.cancel", "取消")}
                                </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={() => onClose()} />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}