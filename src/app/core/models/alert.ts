export class Alert{
    id: string;
    type: string;
    alertType: string;
    subtypeAlert: string;
    locationDescription: string;
    dateTime: string;
    description: string;
    refUser: string;
    refDevice: string;

    constructor(id?: string, type?: string, alertType?: string, subtypeAlert?: string, locationDescription?: string,
                dateTime?: string, description?: Date, refUser?: string,
                refDevice?: string) 
    {
        this.id = id;
        this.type = type;
        this.alertType = alertType;
        this.locationDescription = locationDescription;
        this.dateTime = dateTime;
        this.subtypeAlert = subtypeAlert;
        this.refUser = refUser;
        this.refDevice = refDevice;
    }
}