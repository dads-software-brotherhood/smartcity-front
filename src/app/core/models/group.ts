export class Group {
  id: string;
  type: string;
  group: string
  dateCreated: Date;
  dateModified: Date;
  notificationIds: string[];

  constructor()
  {
    this.type = "GROUP";
  }

}
