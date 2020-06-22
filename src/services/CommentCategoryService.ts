import {HttpClient} from "./HttpClient";
import {ICommentCategory} from "../models/ICommentCategory";

const http = new HttpClient();

export class CommentCategoryService {
    getAll(): Promise<ICommentCategory[]> {
        return http.get('commentCategories');
    }
}