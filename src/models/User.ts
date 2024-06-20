export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    mobileNumber: bigint;
    city: string;
    state: string;
    verified: boolean;
    jobTitle: string;
    created_at: Date;
}
