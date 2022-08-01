import { createStore } from "@stencil/store";

interface StateType {
  roundStarted: boolean;
  scoreSelected: boolean;
}

const boardStore = () => {
  const store = createStore<StateType>({
    roundStarted: false,
    scoreSelected: false,
  });

  return {
    get roundStarted() {
      return store.get('roundStarted');
    },

    startRound() {
      store.set('roundStarted', true);
    },
    
    endRound() {
      store.set('roundStarted', false);
    },
  }
}

export default boardStore;
