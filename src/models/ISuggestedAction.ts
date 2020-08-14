import {IUser} from "./IUser";

export interface ISuggestedAction {
    description: string;
    suggestedBy: IUser;
}