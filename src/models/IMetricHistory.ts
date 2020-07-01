import {IDataset} from "./IDataset";

export interface IMetricHistory {
    datasets: IDataset[];
    labels: string[]
}