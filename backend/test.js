
function isRuntimeValid(str){
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

const runtime1 = '10'
const runtime2 = '400'
const runtime3 = '350'
const runtime4 = '9'
const runtime5 = '09'
const runtime6 = '8.9'
const runtime7 = 'ab'
const runtime8 = '401'

// console.log(isRuntimeValid(runtime1) === 10)
// console.log(isRuntimeValid(runtime2) === 400)
// console.log(isRuntimeValid(runtime3) === 350)
// console.log(isRuntimeValid(runtime4) === false)
// console.log(isRuntimeValid(runtime5) === false)
// console.log(isRuntimeValid(runtime6) === false)
// console.log(isRuntimeValid(runtime7) === false)
// console.log(isRuntimeValid(runtime8) === false)

function isYearValid(str){
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

const year1 = '1930'
const year2 = '2025'
const year3 = '350'
const year4 = '9'
const year5 = '0999'
const year6 = '8.9'
const year7 = 'ab'
const year8 = '1929'
const year9 = '2026'

// console.log(isYearValid(year1) === 1930)
// console.log(isYearValid(year2) === 2025)
// console.log(isYearValid(year3) === false)
// console.log(isYearValid(year4) === false)
// console.log(isYearValid(year5) === false)
// console.log(isYearValid(year6) === false)
// console.log(isYearValid(year7) === false)
// console.log(isYearValid(year7) === false)
// console.log(isYearValid(year7) === false)



function areYearsValid(min, max){
    if (max < min) return false;
    let gap = 20;
    return max - min >= gap
}

// console.log(areYearsValid(1930, 1950) === true)
// console.log(areYearsValid(1930, 1949) === false)
// console.log(areYearsValid(1931, 1950) === false)
// console.log(areYearsValid(1950, 1930) === false)

function areRuntimesValid(min, max){
    if (max < min) return false;
    let gap = 20;
    return max - min >= gap
}


function isIdValid(id){
    if (!!!id) return false
    if (id.length != 24) return false
    const reg = /^[0-9a-f]+$/
    return reg.test(id)
}

// console.log(isIdValid('113'))
// console.log(isIdValid('15ab58fe1514'))
// console.log(isIdValid('6592008029c8c3e4dc76256c'))
// console.log(isIdValid('-2'))
// console.log(isIdValid('6592008029c8c3e4dc76256h'))
// console.log(isIdValid(''))
// console.log(isIdValid(8))
// console.log(isIdValid(null))

function isPageValid(page){
    if (!!!page) return false
    if (page.toString().length > 2) return false
    const reg = /^[1-9]|1[0-9]|20$/
    if (reg.test(page)){
        return Number(page)
    }
    return false
}

// console.log(isPageValid(1))
// console.log(isPageValid('1'))
// console.log(isPageValid('14'))
// console.log(isPageValid(90))
// console.log(isPageValid('140'))
// console.log(isPageValid(null))
// console.log(isPageValid('ab'))
// console.log(isPageValid(-1))
// console.log(isPageValid('08'))
// console.log(isPageValid(100))
// console.log(isPageValid(1000))


function isGenreValid(g){
    const v = ['Animation', '']
}

function isCommentValid(c){
    c = c.toString()
    const sequential_spaces_r = /\s+/g;
    c = c.replace(sequential_spaces_r, " ");
    const r = /[^a-zA-Z0-9À-ÿ \.!?:,()@&\[\]\-_]/g;
    if (c.length > 160 || c.length < 4) return false
    return c.replace(r, " ")
}

// console.log(isCommentValid('Muito legal esse filme!Nãoç~´á é[]()&*-785'))
// console.log(isCommentValid('Muito legal esse filme!Nãoç~´á é[]()&*-785""'))
// console.log(isCommentValid(147475))
// console.log(isCommentValid('Muito legal esse faaaaaaaaaaaaaasdcxazaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaailme!Nãoç~´á é[]()&*-785""'))
// console.log(isCommentValid('      1 15 1 551         b'))



function isQueryValid(q){
    q = q.toString()
    const sequential_spaces_r = /\s+/g;
    q = q.replace(sequential_spaces_r, " ");
    const r = /[^a-zA-Z0-9À-ÿ \.!?:,()@&\[\]\-_]/g;
    if (q.length > 30 || q.length < 1) return false
    return q.toString().replace(r, " ")
}

console.log(isQueryValid(' 1    '))
