

const HandleThsi = {

    

    init (list) {
        if (!list) return false;
        list = typeof list === 'string' ? [list] : list;

    }
}


module.exports = list => HandleThsi.init(list)