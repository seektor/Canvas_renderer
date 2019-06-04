import { VariableMetadata } from "../../../../Database/Redux/JarvisDb/types/DataTypes";

export interface IHostFlatDisplay {
    requestVariableMetadata(cb: (metadata: VariableMetadata) => void): Promise<void>;
    requestVariableValue(cb: (value: number) => void): Promise<void>;
}