export class DateHelper {
    static format(date: Date) {
        const validatedDate = isNaN(date.getTime()) ? new Date() : date;

        return validatedDate.toISOString().split('T')[0];
    }

    static isAfterDate(afterDate: Date, date: Date) {
        if(date.getFullYear() > afterDate.getFullYear()){
            return true;
        }

        if(date.getMonth() > afterDate.getMonth()){
            return true;
        }

        if(date.getDate() > afterDate.getDate()){
            return true;
        }

        return false;
    }
}