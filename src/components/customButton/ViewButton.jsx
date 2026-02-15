import React from 'react';
import { Eye } from "lucide-react";
import { IconButton } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

const ViewButton = (onView, row) => {
    return (
        <Tooltip content="檢視">
            <IconButton
                size="sm"
                rounded="full"
                colorPalette="blue"
                variant="surface"
                onClick={() => onView(row)}

            >
                <Eye size={18}/>
            </IconButton>
        </Tooltip>
    );
};

export default ViewButton;