import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/Services";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/message/${chat?.Id}`);

      if (response.error) {
        return console.log("Error getting messages", response);
      }

      const lastMesasge = response[response?.length - 1];
      setLatestMessage(lastMesasge);
    };
    getMessages();
  }, [newMessage, notifications]);
  return { latestMessage };
};
