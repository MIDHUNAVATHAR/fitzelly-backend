import { Gym } from "../entities/Gym";
import { IBaseRepository } from "./IBaseRepository";

export interface IGymRepository extends IBaseRepository<Gym> {
    findByEmail(email: string): Promise<Gym | null>;
    updatePassword(email:string,password:string):Promise<void>
}

