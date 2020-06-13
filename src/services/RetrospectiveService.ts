import {IRetrospective} from "../models/IRetrospective";
import {HttpClient} from "./HttpClient";
import {IEvaluation} from "../models/IEvaluation";

const http = new HttpClient();

export class RetrospectiveService {
    getAll(): Promise<IRetrospective[]> {
        return http.get('retrospectives');
    }

    addEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
        return http.post(`retrospectives/${evaluation.retrospectiveId}/evaluations`, evaluation);
    }
}