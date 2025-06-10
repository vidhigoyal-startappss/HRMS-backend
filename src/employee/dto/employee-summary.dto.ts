
export class EmployeeSummaryDto {
  _id: string;
  account: {
    email: string;
  };
  basicDetails: {
    firstName: string;
    lastName: string;
    designation: string;
    joiningDate: string;
    employmentType: string;
    gender: string;
  };
}

