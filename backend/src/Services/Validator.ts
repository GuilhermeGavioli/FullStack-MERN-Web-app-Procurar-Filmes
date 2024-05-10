interface Validator{
    validateOAuthToken(oauth_access_token: string): boolean;
}


class ValidatorImpl{
    constructor(){}


    public validateOAuthToken(oauth_access_token: string): boolean{
        return true
    }
}

const validator: Validator = new ValidatorImpl()
export { Validator, validator }