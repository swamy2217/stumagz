import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtilities {
    /**
     * Compares two Date objects and returns e number value that represents
     * the result:
     * 0 if the two dates are equal.
     * 1 if the first date is greater than second.
     * -1 if the first date is less than second.
     * @param date1 First date object to compare.
     * @param date2 Second date object to compare.
     */
    compareDate(date1: Date, date2: Date): number {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        // Check if the dates are equal
        const same = d1.getTime() === d2.getTime();
        if (same) {
            return 0;
        }

        // Check if the first is greater than second
        if (d1 > d2) {
            return 1;
        }

        // Check if the first is less than second
        if (d1 < d2) {
            return -1;
        }
    }
}
