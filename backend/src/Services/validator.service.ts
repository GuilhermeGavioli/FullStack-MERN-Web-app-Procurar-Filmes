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
    isNameValid(n: string): string | false
    isStarsValid(s: number): boolean;
    isGenresValid(la: string): string[] | boolean; //#genre array#
}

export interface Valids{
    year?: Year;
    runtime?: Runtime;
    genres: string[]
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
    public static valid_genres: string[] = ['animation', 'comedy', 'anime', 'horror', 'action', 'epic','postapocaliptycal', 'romance', 'scifi', 'fantasy', 'thriller']

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
        if (c.length > 160 || c.length < 3) return false
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

    public isNameValid(n: string): string | false{
        const sequential_spaces_r = /\s+/g;
        n = n.replace(sequential_spaces_r, " ");
        const r = /[^a-zA-Z0-9À-ÿ \.!?:,()@&\[\]\-_]/g;
        if (n.length > 20 || n.length < 5) return false
        return n.toString().replace(r, " ")
    }

    public isStarsValid(s: number): boolean{
        if (!s) return false
        if (s.toString().length != 1) return false
        if (s < 1 || s > 5) return false
        return true
    }

    public isGenresValid(gl: string): string[] | boolean{
        const splg: string[] = gl.split(',')
        if (splg.length <= 1) return false
        splg.pop()
        const valids: boolean[] = []
        splg.forEach((g: any) => {
            let is_g_valid = false
            ValidatorImpl.valid_genres.forEach(vl => {
                if (vl.toUpperCase() == g.toUpperCase()) is_g_valid = true
            })
            valids.push(is_g_valid)
        })
        let is_valid_final_decision = true
        valids.forEach(i => {
            if (!i) is_valid_final_decision = false
        })
        if (is_valid_final_decision == true) return splg
        return is_valid_final_decision
    }
}


