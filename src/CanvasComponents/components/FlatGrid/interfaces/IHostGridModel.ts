export interface IHostGridModel {
    requestData(from: number, to: number): Promise<void>;
    requestMetadata(): Promise<void>;
}