import {ITopic} from "./ITopic";
import {IAction} from "./IAction";
import {IEvaluation} from "./IEvaluation";
import {ITeam} from "./ITeam";
import {EntityIdentifier} from "../types";

export interface IUserRetrospective {
    id?: EntityIdentifier;
    name: string;
    startDate: string;
    endDate: string;
    topics: ITopic[];
    actions: IAction[];
    evaluation?: IEvaluation;
    teamId: EntityIdentifier;
    team?: ITeam;
}