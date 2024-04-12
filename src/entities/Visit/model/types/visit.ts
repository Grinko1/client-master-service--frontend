export interface Visit {
    id: number,
    date: string,
    time: string,
    client: ClientInfo,
    master: MasterInfo
}
export interface ClientInfo {
    id: number,
    name: string,
    phone: string
}

export interface MasterInfo {
    id: number,
    name: string,
    description: string
}


export interface VisitsSchema {
    form: VisitDataForm
    visits: Visit[];
    isLoading: boolean;
    error?: string;
}
export interface VisitDataForm {
    id: number | null,
    date: string,
    time: string,
    clientId: number | null,
    masterId: number | null
}


