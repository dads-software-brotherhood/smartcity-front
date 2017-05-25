export class GroupProfile {
  subscribed: boolean;
  id: number;
  type: string;
  group: string
  dateCreated: Date;
  dateModified: Date;
  notificationIds: string[];
  notificacionNames: string[];
  constructor()
  {
    this.type = "GROUP";
  }

}
