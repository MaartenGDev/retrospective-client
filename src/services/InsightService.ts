import {HttpClient} from "./HttpClient";
import {IInsight} from "../models/IInsight";

const http = new HttpClient();

export class InsightService {
    getWithFilter(filter: string): Promise<IInsight> {
        return http.get(`insights/${filter}`);
    }
}