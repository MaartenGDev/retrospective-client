import {IMetric} from "./IMetric";
import {IMetricHistory} from "./IMetricHistory";
import {IEvaluation} from "./IEvaluation";

export interface IInsight {
    metrics: IMetric[];
    history: IMetricHistory;
    evaluations: IEvaluation[];
}