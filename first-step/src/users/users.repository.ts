import {Injectable} from "@nestjs/common";

@Injectable()
export class UsersRepository {
    findUsers(term: string) {
        return [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'iLenko'},
        ].filter(u => !term || u.name.indexOf(term) > -1);
    }
}