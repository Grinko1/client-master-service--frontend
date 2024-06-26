export interface Client {
    id: number,
    name: string,
    phone: string,
    user_id?: number,
    visits: ClientVisit[]
}
export interface ClientVisit {
    id: number,
    date: string,
    time: string,
    master: ClientMasterInfo


}
export interface ClientMasterInfo {
    id: number,
    name: string,
    description: string
}
export interface ClientDataProps {
    id: number | null;
    name: string,
    phone?: string,
    userId?: number
}
export interface ClientsSchema {

    form: ClientDataProps
    clients: Client[];
    isLoading: boolean;
    error?: string;
}