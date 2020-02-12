/* eslint-disable no-undef */
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import moment from 'moment'
import store from './store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const INSTANCE_ID = process.env.VUE_APP_INSTANCE_ID;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;
// eslint-disable-next-line no-console
console.log('INSTANCE_LOCATOR', INSTANCE_ID);

let currentUser = null;
let activeRoom = null;

async function sendMessage(text) {
    const messageId = await currentUser.sendMessage({
        text,
        roomId: activeRoom.id
    })
    return messageId;
}

export function isTyping(roomId) {
    currentUser.isTypingIn({ roomId });
}

function disconnectUser(){
    currentUser.disconnect();
}

function setMembers() {
    const members = activeRoom.users.map(user => ({
        username: user.id,
        name: user.name,
        presence: user.presence.state
    }));
    store.commit('setUsers', members);
}

async function subscribeToRoom(roomId) {
    store.commit('clearChatRoom');
    activeRoom = await currentUser.subscribeToRoom({
        roomId,
        messageLimit: MESSAGE_LIMIT,
        hooks: {
            onMessage: message => {
                store.commit('addMessage', {
                    name: message.sender.name,
                    username: message.senderId,
                    text: message.text,
                    date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
                });
            },
            onPresenceChanged: () => {
                setMembers();
            },
            onUserStartedTyping: user => {
                store.commit('setUserTyping', user.id)
            },
            onUserStoppedTyping: () => {
                store.commit('setUserTyping', null)
            }
        }
    });
    setMembers();
    return activeRoom;
}

async function connectUser(userId) {
    const chatManager = new ChatManager({
        instanceLocator: INSTANCE_LOCATOR,
        tokenProvider: new TokenProvider({ url: TOKEN_URL }),
        userId
    });
    currentUser = await chatManager.connect();
    return currentUser;
}

async function createUser(name) {
    const data = {
        token: new TokenProvider({ url: TOKEN_URL }),
        id: name,
        name
    }
    const token = new TokenProvider({ url: TOKEN_URL });
    // eslint-disable-next-line no-console
    console.log('token', token);
    const fetchUrl = `https://us1.pusherplatform.io/services/chatkit/v6/${INSTANCE_ID}/users`;
    await fetch(fetchUrl,{
        method: 'POST',
        body: JSON.stringify(data)
    })
    // await boss.createUser({
    //     id: name,
    //     name
    // })
}

export default {
    sendMessage,
    disconnectUser,
    connectUser,
    createUser,
    subscribeToRoom
}