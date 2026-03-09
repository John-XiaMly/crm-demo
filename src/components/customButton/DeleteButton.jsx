import { IconButton } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip.jsx";
import React from "react";

const DeleteButton = ({ onDelete, row }) => {
    return (
        <Tooltip content="刪除">
            <IconButton
                size="sm"
                rounded="full"
                colorPalette="red"
                variant="surface"
                onClick={() => onDelete(row)}
            >
                <Trash2 size={18}/>
            </IconButton>
        </Tooltip>
    );
}

export default DeleteButton;