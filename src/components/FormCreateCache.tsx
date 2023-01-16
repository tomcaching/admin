import {Box, Radio, RadioGroup} from "@chakra-ui/react";
import React, {useState} from "react";


type CacheType = "traditional" | "mystery";

function FormCreateCache() {
    const [cacheType, setCacheType] = useState<CacheType>("traditional");

    return (
        <Box>
            <RadioGroup
                onChange={(value) => setCacheType(value as CacheType)}
                value={cacheType}
                defaultValue={"mystery"}
            >
                <Radio value="traditional">Tradiční</Radio>
                <Radio value="mystery">Mysterka</Radio>
            </RadioGroup>
        </Box>
    )
}

export default FormCreateCache;