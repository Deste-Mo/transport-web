import { conversationExist, createConversation, createNewMessage, deleteMessages, getAll, getAllConversation, getAllMessages, messageAllSeen, unreadConversation } from "../models/messages.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res)  => {
    try {

        const { message, refMessage } = await req.body;

        var fileContent = null;
        
        if (req.file) {
            fileContent = req.file.filename;
        }

        const senderId = await req.user.userid;
        const { receiverId } = await req.params;

        const conversation = 
                !await conversationExist(senderId, receiverId)
                    ? 
                await createConversation(senderId, receiverId)
                    : 
                await conversationExist(senderId, receiverId);

        if(!conversation) return res.status(400).json({error: "Erreur lors de la generation du conversation"});

        const createMessage = await createNewMessage(message, refMessage, fileContent, conversation.idconversation, receiverId, senderId);

        if(!createMessage) return res.status(400).json({error: "Erreur lors de l'envoie du message"});


        // io.TO() est utiliser pour envoyer un evenement a un utilisateur specifique
        const receiverSocketId = getReceiverSocketId(receiverId);

        
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", createMessage)
        }


        return res.status(201).json({success: true, message: "Message envoyer" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getConversation = async (req, res) => {
    try {

        const senderId = await req.user.userid;

        const allConversation = await getAllConversation(senderId);

        if (!allConversation[0]) return res.status(200).json({success: "Aucune conversation", conversations: {}});

        return res.status(200).json({conversations: allConversation})
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

export const getMessages = async (req, res) => {
    try {

        const senderId = await req.user.userid;

        const { userIdToChat } = await req.params; 

        const allMessage = await getAllMessages(senderId, userIdToChat);

        if (!allMessage[0]) return res.status(200).json({success: "Aucune Messages", messages: {}});

        return res.status(200).json({messages: allMessage})
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllUsers = async (req, res) => {

    const senderId = req.user.userid;

    try {
        const allUsers = await getAll(senderId);

        if (!allUsers[0]) return res.status(200).json({allUsers: {}, success: "Aucun Utilisateur"});

        return res.status(200).json({allUsers: allUsers})
        
    } catch (error) {
        return res.status(500).json({allUsers:{}, error: error.message });
    }

}

export const deleteMessageId = async (req, res) => {

    const { messageId, conversationId } = req.params;

    const myId = req.user.userid;

    try {
        const allMess = await deleteMessages(messageId, conversationId, myId);

        if (!allMess[0]) return res.status(200).json({allMess: {}, success: "Aucun Message"});

        return res.status(200).json({allMess: allMess})
        
    } catch (error) {
        return res.status(500).json({allMess:{}, error: error.message });
    }

}

export const isViewed = async (req, res) => {
    try {
        
        const senderId = await req.user.userid;
        const { userToChat } = await req.params;

        const allSeen = await messageAllSeen(senderId, userToChat);

        if(!allSeen) return res.status(200).json({allSeen: true})

        if(allSeen.number > 0) return res.status(200).json({allSeen: false});

        return res.status(200).json({allSeen: true});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const countUnread = async (req, res) => {
    try {
        
        const senderId = await req.user.userid;

        const unread = await unreadConversation(senderId);


        return res.status(200).json({unread: unread.length});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
