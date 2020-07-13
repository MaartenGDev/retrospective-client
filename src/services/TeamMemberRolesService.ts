import {HttpClient} from "./HttpClient";
import {IRole} from "../models/IRole";

const http = new HttpClient();

export class TeamMemberRolesService {
    getAll(): Promise<IRole[]> {
        return http.get(`teamMemberRoles`);
    }
}