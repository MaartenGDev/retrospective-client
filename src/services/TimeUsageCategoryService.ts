import {HttpClient} from "./HttpClient";
import {ITimeUsageCategory} from "../models/ITimeUsageCategory";

const http = new HttpClient();

export class TimeUsageCategoryService {
    getAll(): Promise<ITimeUsageCategory[]> {
        return http.get('timeUsageCategories');
    }
}