import Vue from 'vue';
import Vuex from 'vuex';
import vuePersist from 'vuex-persist';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new vuePersist({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {
        loading: false,
        sending: false,
        error: 'Relax! This is just a drill error message',
        user: {
          username: 'Jack',
          name: 'Jack Sparrow'
        },
        reconnect: false,
        active: {
          id: '124'
        },
        rooms: [
          {
            id: '123',
            name: 'Ships'
          },
          {
            id: '124',
            name: 'Treasure'
          }
        ],
        users: [
          {
            username: 'Jack',
            name: 'Jack Sparrow',
            presence: 'online'
          },
          {
            username: 'Barbossa',
            name: 'Hector Barbossa',
            presence: 'offline'
          }
        ],
        messages: [
          {
            username: 'Jack',
            date: '11/12/1644',
            text: 'Not all treasure is silver and gold mate'
          },
          {
            username: 'Jack',
            date: '12/12/1644',
            text: 'If you were waiting for the opportune moment, that was it'
          },
          {
            username: 'Hector',
            date: '12/12/1644',
            text: 'You know Jack, I thought I had you figured out'
          }
        ],
        userTyping: null
      },
    mutations,
    actions,
    getters: {
        hasError: state => state.error ? true : false
    },
    strict: debug,
    plugins: [vuexLocal.plugin]
})

