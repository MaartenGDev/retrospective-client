import {HttpClient} from "./HttpClient";
import {IInsight} from "../models/IInsight";
import {ITeamMemberInsight} from "../models/ITeamMemberInsight";

const http = new HttpClient();

export class InsightService {
    getWithFilter(teamId: number|string, filter: string): Promise<IInsight> {
        return http.get(`insights/teams/${teamId}/${filter}`);
    }

    async getForTeamMembers(teamId: number|string): Promise<ITeamMemberInsight[]>  {
        return http.get(`insights/teams/${teamId}/members`);
    }
}