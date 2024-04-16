export interface Appointment {
    form: AppointmentForm,
    isLoading: boolean,
    error: String | undefined

}
export interface AppointmentForm {
    date: string,
    time: string,
    masterId: number | null,
    clientId: number | null
}