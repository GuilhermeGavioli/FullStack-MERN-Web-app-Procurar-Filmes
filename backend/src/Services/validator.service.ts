export interface Validator{
    validateOAuthToken(oauth_access_token: string): boolean;
    isYearValid(str: string): number | false;
    isRuntimeValid(str: string): number | false;
    areYearsValid(min: number, max: number): boolean;
    areRuntimesValid(min: number, max: number): boolean
}

export interface Valids{
    year?: Year;
    runtime?: Runtime;
}

interface Year{
    min: number;
    max: number
}

interface Runtime{
    min: number;
    max: number
}

export class ValidatorImpl{
    constructor(){}

    public validateOAuthToken(oauth_access_token: string): boolean{
        return true
    }

    public isYearValid(str: string): number | false{
        const regex = /^\d+$/;
        if (str.length <= 4 && regex.test(str)){
            const year_num = Number(str)
            if (year_num >= 1930 && year_num <= 2025){
                return year_num
            }
            return false
        }
        return false
    }

    public isRuntimeValid(str: string): number | false{
        const regex = /^\d+$/;
        if (str.length >= 2 && str.length <= 3 && regex.test(str)){
            const runtime_num = Number(str)
            if (runtime_num >= 10 && runtime_num <= 400){
                return runtime_num
            }
            return false
        }
        return false
    }

    public areYearsValid(min: number, max: number): boolean{
        if (max < min) return false;
        let gap = 20;
        return (max - min) >= gap
    }

    public areRuntimesValid(min: number, max: number): boolean{
        if (max < min) return false;
        let gap = 20;
        return max - min >= gap
    }
}


