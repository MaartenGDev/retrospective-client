import {IRetrospective} from "../models/IRetrospective";
import {HttpClient} from "./HttpClient";
import {IEvaluation} from "../models/IEvaluation";

const http = new HttpClient();

export class RetrospectiveService {
    getAll(): Promise<IRetrospective[]> {
        return http.get('retrospectives');
    }

    create(retrospective: IRetrospective): Promise<IRetrospective> {
        return http.post(`retrospectives`, retrospective);
    }

    addEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
        return http.post(`evaluations`, evaluation);
    }
}