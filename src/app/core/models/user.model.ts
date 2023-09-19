export class User {

    id: number;
    email: string;
    password: string = "";


    constructor(data: any) {
        this.id = data?.id;
        this.email = data?.name;
    }
}
