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

    updateEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
        return http.patch(`retrospectives/${evaluation.retrospectiveId}/evaluation`, evaluation);
    }

    getReport(retrospectiveId: number|string): Promise<IRetrospectiveReport> {
        return http.get(`retrospectives/${retrospectiveId}/report`);
    }
}