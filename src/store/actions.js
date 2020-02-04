import chatkit from '../chatkit';

function handleError(commit, error) {
    const message = error.message || error.info.error_description;
    commit('setError', message);
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
        }
    }
}