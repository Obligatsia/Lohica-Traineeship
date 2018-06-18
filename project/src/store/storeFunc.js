import rootReducer from './reducers';


const store = createStore(rootReducer);

export store.subscribe(()=>{
  console.log('subscribe', store.getState());
})

export store.dispatch({type: 'ADD_NAME'});

