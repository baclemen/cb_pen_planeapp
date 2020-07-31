const initState = {
    traces: [],

    initValues: {
        id: 1,
        capacity: 37,
        direct: true,
        luggage: true,
        lowcost: false,
        timefrom: 0,
        timeto: 1,
        dates: [],
    },

    uiState: {
        id: 1,
        capacity: 37,
        direct: true,
        luggage: true,
        lowcost: false,
        depfrom: 0,
        depto: 1,
        dates: [],
    },

    uicolor: "black",
    t: 0,
    deltaT: 0,
    displaytraces: []
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
                //traces = clearTraces(state.traces, state.t + state.deltaT)
                //newT = Math.min(state.t, Math.max(state.t + state.deltaT, 0)) + 1;
            }
            newtraces = [...traces, {type: 'ui', changes: action.changes, trace: action.trace, t: newT}];
            console.log(newtraces)
            return {
                ...state,
                traces: newtraces,
                t: newT,
                deltaT: 0
            }
        case 'SET_STATE':
            return{
                ...state,
                uiState: {
                    ...state.uiState, 
                    ...action.update,
                }
            }

        default:
            break;
    }
    
    return state;
}

export default rootReducer