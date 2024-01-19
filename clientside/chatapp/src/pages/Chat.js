import { Container, Stack } from "react-bootstrap";
import NavBar from "../components/Navbar";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
// import UserChat from "../components/chat/UserChat";
// import UserChat from "../components/chat/as";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);

  return (
    <Container>
      <NavBar />
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats....</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <p>Chatbox</p>
        </Stack>
      )}
      chat
    </Container>
  );
};

export default Chat;
