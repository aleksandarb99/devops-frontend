export class User {
    id: number | null | undefined;
    userName: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    address: string | null | undefined;
    phoneNumber: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    role: string | null | undefined;

    updateUser(values: Partial<User> = {}) {
        this.id = values && values.id ? values.id : null;
        this.userName = values && values.userName ? values.userName : null;
        this.email = values && values.email ? values.email : null;
        this.password = values && values.password ? values.password : null;
        this.address = values && values.address ? values.address : null;
        this.phoneNumber = values && values.phoneNumber ? values.phoneNumber : null;
        this.firstName = values && values.firstName ? values.firstName : null;
        this.lastName = values && values.lastName ? values.lastName : null;
        this.role = values && values.role ? values.role : null;
    }
}