import firebase from 'firebase';

export const sendMessage = async (chatId = null, message, recipient = null) => {
    const { currentUser } = firebase.auth();
    console.log(currentUser);
    let chatUid = null;

    if(!chatId && recipient){
        chatUid = await createNewChat(recipient);
    }
    
    if(chatUid){
        firebase.database().ref(`/chats/${chatUid}/messages`)
        .push({
            sender: currentUser.uid,
            message: message,
            time: new Date()
        })
        .then(() => {
          console.log('Message sent');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    if(!chatId && recipient){
        await updateActiveChatsOfUser();
    }

    return;
}

const createNewChat = async (recipient) => {
    const { currentUser } = firebase.auth();
    const chatUid = `${currentUser}_${new Date().getTime}`;
    try{
        const res = await firebase.database().ref(`/chats/${chatUid}`).set({ 
            admin: currentUser.uid, 
            others: [recipient] 
        });

        console.log('New chat created');
        return { chatId };
    }
    catch(err){
        console.log(err);
        return null;
    }
}

const updateActiveChatsOfUser = async(chatUid, recipient) => {
    const { currentUser } = firebase.auth();
    try{
        await firebase.database().ref(`/users/${currentUser.uid}/active_chats`).push(chatUid);
        await firebase.database().ref(`/users/${recipient}/active_chats`).push(chatUid);
        console.log('Active chat added');
        return true;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

const fetchActiveChats = () => {
    const { currentUser } = firebase.auth();
    
    if(!currentUser.active_chats){
        return;
    }
    
    firebase.database().ref(`/users/${currentUser.uid}/active_chats`)
    .on('value', snapshot => {
        console.log('Fetched active chats');
        console.log(snapshot.val());
    });
}

const 