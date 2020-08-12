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
        const transformedEvaluation: IEvaluation = {
            ...evaluation, comments: evaluation.comments.map(c => {
                delete c.category;
                return c;
            })
        }
        return http.patch(`retrospectives/${evaluation.retrospectiveId}/evaluation`, transformedEvaluation);
    }

    getReport(retrospectiveId: EntityIdentifier): Promise<IRetrospectiveReport> {
        return http.get(`retrospectives/${retrospectiveId}/report`);
    }
}