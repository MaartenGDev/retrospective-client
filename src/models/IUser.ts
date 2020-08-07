import {EntityIdentifier} from "../types";

export interface IUser {
    id: EntityIdentifier;
    fullName: string;
    email: string;
}