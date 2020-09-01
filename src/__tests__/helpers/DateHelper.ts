import '@testing-library/jest-dom/extend-expect'
import {DateHelper} from "../../helpers/DateHelper";

test('Returns true if date is after provided date', () => {
    expect(DateHelper.isAfterDate(new Date("2019-10-10"), new Date("2020-10-10"))).toBeTruthy()
    expect(DateHelper.isAfterDate(new Date("2020-10-10"), new Date("2020-10-11"))).toBeTruthy()
    expect(DateHelper.isAfterDate(new Date("2020-10-10"), new Date("2020-11-10"))).toBeTruthy()
})

test('Returns false if date is before or on the same provided date', () => {
    expect(DateHelper.isAfterDate(new Date("2020-10-10"), new Date("2020-10-09"))).toBeFalsy()
    expect(DateHelper.isAfterDate(new Date("2020-10-10"), new Date("2020-10-10"))).toBeFalsy()
    expect(DateHelper.isAfterDate(new Date("2020-10-10"), new Date("2019-10-11"))).toBeFalsy()
    expect(DateHelper.isAfterDate(new Date("2020-10-10"), new Date("2020-09-10"))).toBeFalsy()
})