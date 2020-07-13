import {IRole} from "../models/IRole";
import {TeamMemberRolesActionTypes, TeamMemberRolesTypes} from "./team-member-roles.actions";

export interface ITeamMemberRolesState {
    roles: IRole[],
}

const initialState: ITeamMemberRolesState = {
    roles: [] as IRole[]
}

export function teamMemberRoleReducer(state: ITeamMemberRolesState = initialState, action: TeamMemberRolesTypes) {
    switch (action.type) {
        case TeamMemberRolesActionTypes.LOADED:
            return {
                ...state,
                roles: action.roles
            }
        default:
            return state
    }
}
