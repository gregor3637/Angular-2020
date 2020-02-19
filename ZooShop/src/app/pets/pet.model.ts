export interface Pet {
    id: string;
    name: string;
    type: string;
    owner?: string;
    passportId?: string;
    lastVaccinationDate?: Date;
    description?: string;
}