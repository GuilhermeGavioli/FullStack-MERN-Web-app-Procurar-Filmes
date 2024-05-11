export interface Validator{
    validateOAuthToken(oauth_access_token: string): boolean;
}


export class ValidatorImpl{
    constructor(){}


    public validateOAuthToken(oauth_access_token: string): boolean{
        return true
    }
}

