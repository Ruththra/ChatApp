import User from '../models/user.model.js';
import Message from '../models/message.model.js';


export const getUsersForSidebar =  async(req, res) => {
    try{
        const senderId = req.user.id;
        const filteredUsers = await User.find({ _id: { $ne: senderId } })
            .select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user.id;

        if (!userToChatId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })//.sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const myId = req.user.id;
        const { text, image } = req.body;

        // if (!receiverId || !text) {
        //     return res.status(400).json({ message: "User ID and message text are required" });
        // }

        let imageUrl;
        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            sender: myId,
            receiver: receiverId,
            text,
            image: imageUrl ? imageUrl : undefined
        });

        await newMessage.save();

        //todo : realtime functionality goes here => socket.io
        

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}