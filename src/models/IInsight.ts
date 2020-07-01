import {IMetric} from "./IMetric";
import {IMetricHistory} from "./IMetricHistory";

export interface IInsight {
    metrics: IMetric[];
    history: IMetricHistory;
}