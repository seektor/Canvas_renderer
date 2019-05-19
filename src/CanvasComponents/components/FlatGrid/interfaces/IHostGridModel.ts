import { TableMetadata } from "../../../../Database/Redux/JarvisDb/types/DataTypes";
import { TDataFrame } from "../structures/TDataFrame";

export interface IHostGridModel {
    requestData(from: number, to: number, cb: (data: TDataFrame) => void): Promise<void>;
    requestMetadata(cb: (metadata: TableMetadata) => void): Promise<void>;
}