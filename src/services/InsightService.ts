import {HttpClient} from "./HttpClient";
import {IInsight} from "../models/IInsight";
import {ITeamMemberInsight} from "../models/ITeamMemberInsight";

const http = new HttpClient();

export class InsightService {
    getWithFilter(teamId: number, filter: string): Promise<IInsight> {
        return http.get(`insights/teams/${teamId}/${filter}`);
    }

    async getForTeamMembers(teamId: number): Promise<ITeamMemberInsight[]>  {
        return http.get(`insights/teams/${teamId}/members`);
    }
}