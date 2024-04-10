

export interface ClientWithVisits{
    id:number,
    name:string,
    phone:string
    visits:ClientVisit[]
}
export interface ClientVisit{
    id:number,
    date: string,
    time: string,
    master:ClientMasterInfo


}
export interface ClientMasterInfo{
    id:number,
    name:string,
    description:string
}
export interface ClientForm{
    name:string,
    phone:string
}
export interface ClientsWithVisitsSchema{
    form:ClientForm
    clients: ClientWithVisits[];
    isLoading: boolean;
    error?: string;
}