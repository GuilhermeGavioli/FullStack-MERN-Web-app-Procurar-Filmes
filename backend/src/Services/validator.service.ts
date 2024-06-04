export interface Validator{
    validateOAuthToken(oauth_access_token: string): boolean;
    isYearValid(str: string): number | false;
    isRuntimeValid(str: string): number | false;
    areYearsValid(min: number, max: number): boolean;
    areRuntimesValid(min: number, max: number): boolean;
    isIdValid(id: string): boolean;
    isPageValid(page: string): number | false;
    isCommentValid(c: string): string | false;
    isQueryValid(q: string): string | false
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

    public isIdValid(id: string): boolean{
        if (!!!id) return false
        if (id.length != 24) return false
        const reg = /^[0-9a-f]+$/
        return reg.test(id)
    }

    public isPageValid(page: string): number | false{
        if (!!!page) return false
        if (page.toString().length > 2) return false
        const reg = /^[1-9]|1[0-9]|20$/
        if (reg.test(page)){
            return Number(page)
        }
        return false
    }

    public isCommentValid(c: string): string | false{
        c = c.toString()
        const sequential_spaces_r = /\s+/g;
        c = c.replace(sequential_spaces_r, " ");
        const r = /[^a-zA-Z0-9À-ÿ \.!?:,()@&\[\]\-_]/g;
        if (c.length > 160 || c.length < 4) return false
        return c.replace(r, " ")
    }

    public isQueryValid(q: string): string | false{
        q = q.toString()
        const sequential_spaces_r = /\s+/g;
        q = q.replace(sequential_spaces_r, " ");
        const r = /[^a-zA-Z0-9À-ÿ \.!?:,()@&\[\]\-_]/g;
        if (q.length > 30 || q.length < 1) return false
        return q.toString().replace(r, " ")
    }
}


