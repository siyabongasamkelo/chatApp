import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/Services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [pontentialChats, setPotentialChats] = useState([]);
  const [currentChats, setCurrentChats] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);

  console.log("messages", messages);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error fetching users", response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };
    getUsers();
    //before there was a userChats on the dependencies then i removed it bcz it was causing too man re renders...
  }, []);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatLoading(true);
        setUserChatError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatLoading(false);

        if (response.error) {
          return setUserChatError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessageError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChats?._id}`
      );

      setIsMessageLoading(false);

      if (response.error) {
        return setMessageError(response);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChats]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChats(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatLoading,
        userChatError,
        pontentialChats,
        createChat,
        updateCurrentChat,
        currentChats,
        messages,
        isMessageLoading,
        messageError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
