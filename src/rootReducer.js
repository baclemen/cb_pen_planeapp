const initState = {
    traces: [],

    initValues: {
        id: 1,
        adults: 1,
        kids: 0,
        direct: false,
        luggage: false,
        lowcost: false,
        depfrom: 0,
        depto: 1,
        arrfrom: 0,
        arrto: 1,
        dates: [],
        date: new Date(),
        sortBy: {val: "date", ascending: true}
    },

    uiState: {
        id: 1,
        adults: 1,
        kids: 0,
        direct: false,
        luggage: false,
        lowcost: false,
        depfrom: 0,
        depto: 1,
        arrfrom: 0,
        arrto: 1,
        dates: [],
        date: new Date(),
        sortBy: {val: "date", ascending: true}
    },

    uicolor: "black",
    t: 0,
    deltaT: 0,
    displaytraces: []
}

function getPenState(traces, penstate, t){   

    var dates = []

    for(var i = 0; i < traces.length; i++){
        if(t < traces[i].t){
            break
        }
        if(traces[i].type === 'ui'){
            penstate = {...penstate, ...traces[i].changes}

            if(traces[i].changes.dates){
                for(var j = 0; j < traces[i].changes.dates.length; j++){
                    if(traces[i].changes.dates[j].add){
                        if(!dates.map(x => x.getTime()).includes(traces[i].changes.dates[j].val.getTime())){
                            dates = [...dates, traces[i].changes.dates[j].val]
                        }
                    }
                    else{
                        if(dates.map(x => x.getTime()).includes(traces[i].changes.dates[j].val.getTime())){
                            dates = dates.filter(x => x.getTime() !== traces[i].changes.dates[j].val.getTime())
                        }
                    }
                }
            }
        }
    }
    penstate.dates = dates;
    return penstate
}

function clearTraces(traces, t) {
    var i = 0;

    for(; i < traces.length; i++){
        if (traces[i].t <= t){

        }
        else{
            break
        }
    }
    return traces.slice(0,i)

}


const rootReducer = (state = initState, action) => {
    var traces, newT, newtraces
    switch (action.type) {
        case 'CHECK':
            return{
                ...state,
                uiState:{
                    ...state.uiState,
                    [action.id]: !state.uiState[action.id]
                }
            }
        
        case 'ADD_UITRACE':
            var newT
            if(state.deltaT === 0){
                traces = state.traces;
                newT = state.t + 1;
            }
            else{
                traces = clearTraces(state.traces, state.t + state.deltaT)
                newT = Math.min(state.t, Math.max(state.t + state.deltaT, 0)) + 1;
            }
            newtraces = [...traces, {type: 'ui', changes: action.changes, trace: action.trace, t: newT}];
            return {
                ...state,
                traces: newtraces,
                t: newT,
                deltaT: 0
            }
        
        case 'DEL_UITRACE':
            newtraces = [...state.traces.filter(el => el.t !== action.t)]
            var uiState = getPenState(newtraces, state.initValues , state.t + state.deltaT) 
            return {
                ...state,
                traces: newtraces,
                t: (state.t+1),
                tMax: (state.t+1),
                uiState
            }
        case 'SET_STATE':
            return{
                ...state,
                uiState: {
                    ...state.uiState, 
                    ...action.update,
                }
            }
        
        case 'ADD_DISPLAYTRACE':
            if(state.displaytraces.find(el => el.t === action.t)){
                return {...state}
            }
            else {
                var newdisplaytraces = [...state.displaytraces, {t: action.t, alpha: action.alpha}]
                return {
                    ...state,
                    displaytraces: newdisplaytraces
                }
            }

        case 'CLR_DISPLAYTRACES':
            return {
                ...state,
                displaytraces: []
            }
        case 'CLR_DISPLAYTRACE':
            newtraces = [...state.displaytraces.filter(el => el.t !== action.t)]
            return {
                ...state,
                displaytraces: newtraces
            }
        case 'SET_DISPLAYTRACES':
            var uiState = getPenState(state.traces, state.initValues, state.t + state.deltaT);
            return{
                ...state,
                displaytraces: action.list,
                uiState
            }
        case 'DELTA_T':
            if (action.deltaT === state.deltaT){
                return{
                    ...state
                }
            }
            else {
                var uiState = getPenState(state.traces, state.initValues, state.t + action.deltaT);
                return{
                    ...state,
                    deltaT : action.deltaT,
                    uiState
                }
            }
        case 'UPDATE_T':
            return{
                ...state,
                t : state.t + state.deltaT,
                deltaT: 0,
            }

        default:
            break;
    }
    
    return state;
}

export default rootReducer