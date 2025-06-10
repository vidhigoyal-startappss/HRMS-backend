export class FilterAttendanceDto {
  role: 'super-admin' | 'admin' | 'employee' | 'hr';
  userId: string;
}
