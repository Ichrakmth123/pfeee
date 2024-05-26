import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);


  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
	// const [conversations, setConversations] = useState([])
	// const [messages, setMessages] = useState({})
	// const [message, setMessage] = useState('')
	// const [users, setUsers] = useState([])
	// const [socket, setSocket] = useState(null)
	// const messageRef = useRef(null)

	// useEffect(() => {
	// 	setSocket(io('http://localhost:8080'))
	// }, [])

	// useEffect(() => {
	// 	socket?.emit('addUser', user?.id);
	// 	socket?.on('getUsers', users => {
	// 		console.log('activeUsers :>> ', users);
	// 	})
	// 	socket?.on('getMessage', data => {
	// 		setMessages(prev => ({
	// 			...prev,
	// 			messages: [...prev.messages, { user: data.user, message: data.message }]
	// 		}))
	// 	})
	// }, [socket])

	// useEffect(() => {
	// 	messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
	// }, [messages?.messages])

	// useEffect(() => {
	// 	const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
	// 	const fetchConversations = async () => {
	// 		const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			}
	// 		});
	// 		const resData = await res.json()
	// 		setConversations(resData)
	// 	}
	// 	fetchConversations()
	// }, [])

	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			}
	// 		});
	// 		const resData = await res.json()
	// 		setUsers(resData)
	// 	}
	// 	fetchUsers()
	// }, [])

	// const fetchMessages = async (conversationId, receiver) => {
	// 	const res = await fetch(`http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		}
	// 	});
	// 	const resData = await res.json()
	// 	setMessages({ messages: resData, receiver, conversationId })
	// }

	// const sendMessage = async (e) => {
	// 	setMessage('')
	// 	socket?.emit('sendMessage', {
	// 		senderId: user?.id,
	// 		receiverId: messages?.receiver?.receiverId,
	// 		message,
	// 		conversationId: messages?.conversationId
	// 	});
	// 	const res = await fetch(`http://localhost:8000/api/message`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			conversationId: messages?.conversationId,
	// 			senderId: user?.id,
	// 			message,
	// 			receiverId: messages?.receiver?.receiverId
	// 		})
	// 	});
	// }
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
