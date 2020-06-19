import {IRetrospective} from "../models/IRetrospective";
import {HttpClient} from "./HttpClient";
import {IEvaluation} from "../models/IEvaluation";
import {ICommentCategory} from "../models/ICommentCategory";

const http = new HttpClient();

export class CommentCategoryService {
    getAll(): Promise<ICommentCategory[]> {
        return http.get('commentCategories');
    }
}