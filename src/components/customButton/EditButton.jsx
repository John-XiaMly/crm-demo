import React from 'react';
import { Tooltip } from "@/components/ui/tooltip.jsx";
import { Edit } from "lucide-react";
import { IconButton } from "@chakra-ui/react";

const EditButton = ({ onEdit, row }) => {
    return (
        <Tooltip content="編輯">
            <IconButton
                size="sm"
                rounded="full"
                colorPalette="green"
                variant="surface"
                onClick={() => onEdit(row)}
            >
                <Edit size={18}/>
            </IconButton>
        </Tooltip>
    );
};

export default EditButton;