import {IUserRetrospective} from "../models/IUserRetrospective";
import {HttpClient} from "./HttpClient";
import {IEvaluation} from "../models/IEvaluation";
import {IRetrospectiveReport} from "../models/IRetrospectiveReport";
import {EntityIdentifier} from "../types";

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

    delete(retrospectiveId: EntityIdentifier): Promise<void> {
        return http.delete(`retrospectives/${retrospectiveId}`);
    }

    updateEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
        return http.patch(`retrospectives/${evaluation.retrospectiveId}/evaluation`, evaluation);
    }

    getReport(retrospectiveId: EntityIdentifier): Promise<IRetrospectiveReport> {
        return http.get(`retrospectives/${retrospectiveId}/report`);
    }
}