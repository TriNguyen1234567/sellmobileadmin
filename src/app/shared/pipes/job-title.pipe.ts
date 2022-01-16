import { Pipe, PipeTransform } from '@angular/core';
import { JOB_TYPE, NA, PEOPLE_JOBS } from '../../constant/common';
import { notEmpty } from '../../utils/data.utils';

@Pipe({
  name: 'jobTitle'
})
export class JobTitlePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const job = PEOPLE_JOBS.find((x: {value: JOB_TYPE}) => x.value === value.trim());
    if (notEmpty(job)) {
      return job.label
    }
    return NA
  }

}
