import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecientUser } from "../../hooks/useFetchReciept";
import { Stack } from "react-bootstrap";
import moment from "moment";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChats, messages, isMessageLoading } = useContext(ChatContext);
  const { recipientUser } = useFetchRecientUser(currentChats, user);

  console.log("recipientUser", recipientUser);

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%", color: "white" }}>
        No conversation yet...
      </p>
    );

  if (isMessageLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack key={index}>
              <span>{message.text}</span>
              <span>{moment(message.createAt).calender()}</span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
