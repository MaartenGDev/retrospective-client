import {EntityIdentifier} from "../types";

export interface ITopic {
    id: EntityIdentifier;
    description: string;
    durationInMinutes: number;
    order: number;
}