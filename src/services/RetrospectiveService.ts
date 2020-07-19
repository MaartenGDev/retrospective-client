import {IUserRetrospective} from "../models/IUserRetrospective";
import {HttpClient} from "./HttpClient";
import {IEvaluation} from "../models/IEvaluation";
import {IRetrospectiveReport} from "../models/IRetrospectiveReport";

const http = new HttpClient();

export class RetrospectiveService {
    getAll(): Promise<IUserRetrospective[]> {
        return http.get('retrospectives');
    }

    create(retrospective: IUserRetrospective): Promise<IUserRetrospective> {
        return http.post(`retrospectives`, retrospective);
    }

    update(retrospective: IUserRetrospective): Promise<IUserRetrospective> {
        return http.patch(`retrospectives/${retrospective.id}`, retrospective);
    }

    addEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
        return http.post(`evaluations`, evaluation);
    }

    updateEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
        return http.patch(`evaluations/${evaluation.id!}`, evaluation);
    }

    getReport(retrospectiveId: number|string): Promise<IRetrospectiveReport> {
        return http.get(`retrospectives/${retrospectiveId}/report`);
    }
}