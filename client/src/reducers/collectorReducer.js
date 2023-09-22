const initalState = [
    {
      name:'collector1',
      collection:[],
      selected:true
    }
];

let copyState = null;
let index = 0;

const collectorReducer = (state = initalState, action) => {
    const {type, payload} = action;
    switch (type) {
      case 'CREATE_COLLECTOR':
        return [
          ...state,
          {
            name: payload.name,
            collection:[],
            selected:false
          }
        ];
      case 'DELETE_COLLECTOR':
        copyState = [...state];
        index = copyState.findIndex((x) => x.name === payload.name);
        copyState.splice(index, 1);
        return [...copyState];   
      case 'ADD_COLLECTION_IN_COLLECTOR':
        const collectorIndex = state.findIndex((collector) => collector.name === payload.name);
        if (collectorIndex === -1) {
          return state;
        }
        const updatedCollector = { ...state[collectorIndex] };
        if (updatedCollector.collection.length >= 10) {
          return state;
        }
        const updatedCollection = [...updatedCollector.collection, payload.collectionID];
        const updatedState = [...state];
        updatedState[collectorIndex] = { ...updatedCollector, collection: updatedCollection };
        return updatedState;
      case 'REMOVE_COLLECTION_IN_COLLECTOR':
        const collectorIdx = state.findIndex((collector) => collector.name === payload.name);
        if (collectorIdx === -1) {
          return state;
        }
        const collector = { ...state[collectorIdx] };
        const collectionIdx = collector.collection.indexOf(payload.collectionID);
        if (collectionIdx !== -1) {
          collector.collection = [
            ...collector.collection.slice(0, collectionIdx),
            ...collector.collection.slice(collectionIdx + 1)
          ];
        }
        const newState = [...state.slice(0, collectorIdx),collector,...state.slice(collectorIdx + 1)];
        return newState;
      case 'SELECT_COLLECTOR':
        const updatedCollectors = state.map(collector => {
          if (collector.name === payload.name) {
            return { ...collector, selected: true };
          } else {
            return { ...collector, selected: false };
          }
        });
        return updatedCollectors;
      case 'UNSELECT_COLLECTOR':
        if (state.length <= 1) {
          return state;
        }
        const updatedCollectors2 = state.map(collector => {
            return { ...collector, selected: false };
        });
        return updatedCollectors2;
      default:
        return state;
    }
  };
  
  export default collectorReducer;