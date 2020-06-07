import {RetrospectiveStatus} from "./RetrospectiveStatus";
import {IEvent} from "./IEvent";
import {IAction} from "./IAction";

export interface IRetrospective {
    id: number;
    name: string;
    status: RetrospectiveStatus;
    startDate: Date;
    endDate: Date;
    agenda: IEvent[],
    actions: IAction[],
}