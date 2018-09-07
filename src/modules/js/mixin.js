import Foot from 'components/Foot.vue'

let mixin={
    components:{
        Foot
    },
    filters:{
        currency(number){
            let priceStr=''+number
            if(priceStr.indexOf('.')>-1){
            let arr=priceStr.split('.')
            return arr[0]+'.'+(arr[1]+'0').substr(0,2)
            }
       else {
           return number+'.00'
       }
       }
       }
    }

export default mixin