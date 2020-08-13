import {EntityIdentifier} from "../types";

export interface ICommentCategory {
    id: number;
    name: string;
    description: string;
    iconLabel: string;
    iconColor: string;
    minimalCommentCount: number;
}