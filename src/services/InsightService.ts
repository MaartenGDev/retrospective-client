import {HttpClient} from "./HttpClient";
import {IInsight} from "../models/IInsight";
import {ITeamMemberInsight} from "../models/ITeamMemberInsight";
import {EntityIdentifier} from "../types";
import {IRatingInsight} from "../models/IRatingInsight";

const http = new HttpClient();

export class InsightService {
    getWithFilter(teamId: EntityIdentifier, filter: string): Promise<IInsight> {
        return http.get(`insights/teams/${teamId}/${filter}`);
    }

    getForTeamMembers(teamId: EntityIdentifier): Promise<ITeamMemberInsight[]>  {
        return http.get(`insights/teams/${teamId}/members`);
    }

    getRatings(teamId: EntityIdentifier): Promise<IRatingInsight[]>  {
        return http.get(`insights/teams/${teamId}/ratings`);
    }
}