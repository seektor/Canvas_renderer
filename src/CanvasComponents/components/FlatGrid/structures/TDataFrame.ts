import { DataRow } from "../../../../Database/Redux/JarvisDb/types/DataTypes";

export interface TDataFrame {
    rows: DataRow[];
    from: number;
    to: number;
}