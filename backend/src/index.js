const jwt = require('jsonwebtoken')


const s = 'secrets3%4t#oreds48ad84cae9rq$#$#'
    function generateToken(id, name, email){
        const d = jwt.sign({id, name, email}, s, {expiresIn: '1m'})
        console.log(d)
    }



    function verify(token){
            return jwt.verify(token, s, (e, d)=>{
                if (e){
                    if (e.name == 'TokenExpiredError'){
                        return {expired: true}
                    } else if (e.name == 'JsonWebTokenError') {
                        return {valid: false}
                    }
                } else {
                    return {data: d}
                }
            })
    }

    generateToken(1, 'locla@151#', 'adcadsc51.coolemail@sacadscmialcorp')
    // verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvY2xhQDE1MSMiLCJlbWFpbCI6ImFkY2Fkc2M1MS5jb29sZW1haWxAc2FjYWRzY21pYWxjb3JwIiwiaWF0IjoxNzE1NjEyMTk3LCJleHAiOjE3MTU2MTIyNTd9.LhXozER8XffGobLePrbPtLGdGzFHyvc_VMw-_GbXCq8')
    
    
        const  t =verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvY2xhQDE1MSMiLCJlbWFpbCI6ImFkY2Fkc2M1MS5jb29sZW1haWxAc2FjYWRzY21pYWxjb3JwIiwiaWF0IjoxNzE1NjE0MTk2LCJleHAiOjE3MTU2MTQyNTZ9.-4lnPUneascC3MN3vFjo-EIabnTXSFOZPO27c8cXNVw')
        if (t.valid == false){
            console.log('invalid')
        } else if (t.expired == true){
            console.log('expired')
        } else {
            console.log(t.data)
        }

        

   