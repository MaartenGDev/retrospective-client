import {EntityIdentifier} from "../types";

export interface ICommentCategory {
    id: EntityIdentifier;
    name: string;
    description: string;
    iconLabel: string;
    iconColor: string;
    minimalCommentCount: number;
}