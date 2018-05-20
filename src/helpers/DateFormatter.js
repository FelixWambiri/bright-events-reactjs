import moment from 'moment/moment';

export default (date, format = 'YYYY-MM-DD') => moment(date).format(format);

