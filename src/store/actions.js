/* eslint-disable no-undef */
import chatkit from '../chatkit';

function handleError(commit, error) {
    const message = error.message || error.info.error_description || error;
    // const message = error.message || error.info.error_description || error;
    
    commit('setError', message);
    // eslint-disable-next-line no-console
    console.log('errorMessage', message);
}

function handleAlert(commit, error) {
    const value = error.message || error.info.error_description || error;
    const len = value.length;
    const now = new Date();
    const id = now.getTime();
    const variant = 'info';
    commit('setAlertList',{
        id, 
        value,
        len,
        variant
    })
}


export default {
    async login({ commit, state }, userId) {
        try {
            commit('setError', '');
            commit('setLoading', true);
            const currentUser = await chatkit.connectUser(userId);

            commit('setUser', {
                username: currentUser.id,
                name: currentUser.name
            })
            commit('setReconnect', false);
            // eslint-disable-next-line no-console
            console.log('currentUser', state.user);
            const rooms = currentUser.rooms.map(room => ({
                id: room.id,
                name: room.name
            }))
            commit('setRooms', rooms);

            // Subscribe user to a room
            const activeRoom = state.activeRoom || rooms[0]; // pick last used room, or the first one
            commit('setActiveRoom', {
                id: activeRoom.id,
                name: activeRoom.name
            });
            await chatkit.subscribeToRoom(activeRoom.id);

            return true;
        } catch (e) {
            handleError(commit, e);
            handleAlert(commit, e);
        } finally {
            commit('setLoading', false);
        }
    },
    async changeRoom({ commit }, roomId) {
        try {
            const { id, name } = await chatkit.subscribeToRoom(roomId);
            commit('setActiveRoom', { id, name });
        } catch (e) {
            handleError(commit, e);
            handleAlert(commit, e);
        }
    },
    async sendMessage({ commit }, text) {
        try {
            commit('setError', '');
            commit('setSending', true);
            const messageId = await chatkit.sendMessage(text);
            return messageId;
        } catch (e) {
            handleError(commit, e);
            handleAlert(commit, e);
        } finally {
            commit('setSending', false);
        }
    },
    async createUser({ commit }, userObj) {
        try {
            commit('setError', '');
            commit('setSending', true);
            // const currentUser = chatkit.connectUser('boss');
            await chatkit.createUser(userObj);
        } catch (e) {
            handleError(commit, `createUser${e}`);
            handleAlert(commit, e);
        } finally {
            commit('setSending', false);
        }
    },
    logout({ commit }) {
        commit('reset');
        chatkit.disconnectUser();
        window.localStorage.clear();
    }

}