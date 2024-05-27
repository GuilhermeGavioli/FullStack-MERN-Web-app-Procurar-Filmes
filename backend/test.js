
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