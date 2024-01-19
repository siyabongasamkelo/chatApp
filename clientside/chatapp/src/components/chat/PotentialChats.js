import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { pontentialChats, createChat } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        {pontentialChats &&
          pontentialChats.map((u, index) => {
            console.log("u", u.name);
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => {
                  createChat(user._id, u._id);
                }}
              >
                {u.name}
                <span className="user-online"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
