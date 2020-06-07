import {IRetrospective} from "../models/IRetrospective";
import {RetrospectiveStatus} from "../models/RetrospectiveStatus";

export class RetrospectiveService {
    mockRetrospectives: IRetrospective[] = [
        {
            id: 1,
            name: 'Retro WEB #57 - SERVICE',
            status: RetrospectiveStatus.OPEN,
            startDate: new Date(),
            endDate: new Date(),
            agenda: [
                {id: 1, description: 'Point 1', durationInMinutes: 30},
                {id: 2, description: 'Point 2', durationInMinutes: 60},
            ],
            actions: [
                {id: 1, completed: true, description: 'Create notes', responsible: 'Developer 1' },
                {id: 2, completed: false, description: 'Add new form', responsible: 'Web team'},
            ]
        },
        {
            id: 2,
            name: 'Retro WEB #56 - SERVICE',
            status: RetrospectiveStatus.FINISHED,
            startDate: new Date(),
            endDate: new Date(),
            agenda: [
                {id: 1, description: 'Another point 1', durationInMinutes: 30},
                {id: 2, description: 'Another Point 2', durationInMinutes: 60},
            ],
            actions: [
                {id: 1, completed: true, description: 'Create notes', responsible: 'Developer 1' },
                {id: 2, completed: false, description: 'Add new form', responsible: 'Web team'},
            ]
        }
    ];

    getAll(): Promise<IRetrospective[]> {
        return Promise.resolve(this.mockRetrospectives);
    }

    get(retrospectiveId: number): Promise<IRetrospective> {
        return Promise.resolve(this.mockRetrospectives.find(r => r.id === retrospectiveId)!);
    }
}