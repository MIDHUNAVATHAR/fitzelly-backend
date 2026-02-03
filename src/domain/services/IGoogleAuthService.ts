export interface IGoogleAuthService {
    getGoogleEmail(code:string):Promise<string>;
    generateAuthUrl(role:string,mode:string):string;
}