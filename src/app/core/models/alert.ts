export class Alert{
    id: string;
    type: string;
    alertType: string;
    eventObserved: string;
    locationDescription: string;
    dateTime: string;
    description: string;
    refUser: string;
    refDevice: string;

    constructor(id?: string, type?: string, alertType?: string, eventObserved?: string, locationDescription?: string,
                dateTime?: string, description?: Date, refUser?: string,
                refDevice?: string) 
    {
        this.id = id;
        this.type = type;
        this.alertType = alertType;
        this.locationDescription = locationDescription;
        this.dateTime = dateTime;
        this.eventObserved = eventObserved;
        this.refUser = refUser;
        this.refDevice = refDevice;
    }
}