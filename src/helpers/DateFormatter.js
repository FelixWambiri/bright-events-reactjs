import moment from "moment/moment";
export default (date,format='YYYY-MM-DD')=>{
    return moment(date).format(format)
}