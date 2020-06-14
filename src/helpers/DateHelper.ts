export class DateHelper {
    static format(date: Date) {
        return date.toISOString().split('T')[0];
    }
}