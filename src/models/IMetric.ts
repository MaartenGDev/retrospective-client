export interface IMetric {
    name: string;
    color: string;
    formattedValue: string;
    changePercentage: number;
    increaseIsPositive: boolean;
}