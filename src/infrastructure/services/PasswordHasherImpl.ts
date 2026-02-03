import bcrypt from "bcryptjs";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";

export class PasswordHasherImpl implements IPasswordHasher{
    private readonly SALT_ROUNDS = 10;

    async hash(password:string):Promise<string>{
        return await bcrypt.hash(password,this.SALT_ROUNDS)
    }

    async compare(password:string,hashedPassword:string):Promise<boolean>{
        return await bcrypt.compare(password,hashedPassword)
    }
}