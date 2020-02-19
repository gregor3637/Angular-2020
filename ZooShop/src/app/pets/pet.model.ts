export interface Pet {
    id: string;
    name: string;
    type: string;
    passportId?: string;
    lastVaccinationDate?: Date;
    description?: string;
}