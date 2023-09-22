const addCollector = (name,collection ) => ({
    type: 'CREATE_COLLECTOR',
    payload: {
      name: name,
      collection: collection
    }
});
  
const deleteCollector = (name) => ({
    type: 'DELETE_COLLECTOR',
    payload: {name: name}
});

const addCollectionInCollector = (name,collectionID) => ({
    type: 'ADD_COLLECTION_IN_COLLECTOR',
    payload: {
        name:name,
        collectionID:collectionID
    }
});

const removeCollectionInCollector = (name,collectionID) => ({
    type: 'REMOVE_COLLECTION_IN_COLLECTOR',
    payload: {
        name:name,
        collectionID:collectionID
    }
});

const selectCollector = (name) => ({
	type: 'SELECT_COLLECTOR',
	payload: {
		name: name
	},
});

const unselectCollector = (name) => ({
	type: 'UNSELECT_COLLECTOR',
	payload: {
		name: name
	},
});

module.exports = {
    addCollector,
    deleteCollector,
    addCollectionInCollector,
    removeCollectionInCollector,
    selectCollector,
    unselectCollector
  };