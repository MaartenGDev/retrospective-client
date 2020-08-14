import {IUser} from "./IUser";

export interface ISuggestedAction {
    id: number;
    description: string;
    suggestedBy: IUser;
}