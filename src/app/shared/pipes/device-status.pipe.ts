import { Pipe, PipeTransform } from '@angular/core';
import { DEVICE_STATUS, MOBILE_STATUSES, NA } from '../../constant/common';
import { notEmpty } from '../../utils/data.utils';

@Pipe({
  name: 'deviceStatus'
})
export class DeviceStatusPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const status = MOBILE_STATUSES.find((x: { value: DEVICE_STATUS }) => x.value === value.trim());
    if (notEmpty(status)) {
      return status.label
    }
    return NA
  }

}
