export class DateHelper {
    static format(date: Date) {
        const validatedDate = isNaN(date.getTime()) ? new Date() : date;

        return validatedDate.toISOString().split('T')[0];
    }
}