export class Alert{
    id: string;
    type: string;
    alertType: string;
    locationDescription: string;
    dataTime: string;
    severity: number;
    description: string;
    refUser: string;
    refDevice: string;
    severityDesc: string;

    constructor(id?: string, type?: string, alertType?: string, locationDescription?: string,
                dataTime?: string, severity?: number, description?: Date, refUser?: string,
                refDevice?: string, severityDesc?: string) 
    {
        this.id = id;
        this.type = type;
        this.alertType = alertType;
        this.locationDescription = locationDescription;
        this.dataTime = dataTime;
        this.severity = severity;
        this.refUser = refUser;
        this.refDevice = refDevice;
        this.severityDesc = severityDesc;
    }
}