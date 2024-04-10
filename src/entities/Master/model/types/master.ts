export interface Master {
    id: number,
    name: string,
    description: string,
    visits: ClientVisit[]
}
export interface ClientVisit {
    id: number,
    date: string,
    time: string,
    client: ClientMasterInfo


}
export interface ClientMasterInfo {
    id: number,
    name: string,
    phone: string
}
export interface MasterDataProps {
    id: number | null;
    name: string,
    description: string
}
export interface MastersSchema {
    form: MasterDataProps
    masters: Master[];
    isLoading: boolean;
    error?: string;
}