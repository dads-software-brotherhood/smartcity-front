export class Customer {
  id: string;
  firstName: string;
  lastName: string;
  isEdit: boolean;

  constructor(firstName?: string, lastName?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.isEdit = false;
  }
}
