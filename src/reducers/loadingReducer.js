import {FAILED, REQUEST, SUCCESS} from "../constants/API";

const classify = (type) => {
    if(type.includes(REQUEST)){
        return REQUEST;
    }
    if(type.includes(SUCCESS)){
        return SUCCESS;
    }
    if(type.includes(FAILED)){
        return FAILED;
    }
}

export default function loadingReducer(state, action) {
    switch (classify(action.type)) {
        case REQUEST:
            return true;
        case SUCCESS:
        case FAILED:
        default:
            return false;
    }
}