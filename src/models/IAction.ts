import {EntityIdentifier} from "../types";

export interface IAction {
    id: EntityIdentifier;
    description: string;
    responsible: string;
    isCompleted: boolean;
}