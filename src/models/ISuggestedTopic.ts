import {IUser} from "./IUser";

export interface ISuggestedTopic {
    id: number;
    description: string;
    suggestedBy: IUser;
}