import {HttpClient} from "./HttpClient";
import {ITeam} from "../models/ITeam";

const http = new HttpClient();

export class TeamService {
    getAll(): Promise<ITeam[]> {
        return http.get('teams');
    }

    create(team: ITeam): Promise<ITeam> {
        return http.post(`teams`, team);
    }

    update(team: ITeam): Promise<ITeam> {
        return http.patch(`teams/${team.id}`, team);
    }

    delete(teamId: number): Promise<void> {
        return http.delete(`teams/${teamId}`);
    }

    findByInviteCode(inviteCode: string): Promise<ITeam> {
        return http.get(`teams/discover/${inviteCode}`);
    }
}