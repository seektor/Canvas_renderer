import { ILayer } from "./ILayer";

export interface IStage extends ILayer {
    getSublayers(): ReadonlyArray<ILayer>;
}