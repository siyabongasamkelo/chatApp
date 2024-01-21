import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadNotificationsFunc } from "../../utils/unReadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notifications, userChats, allUsers, markAllNotificationAsRead } =
    useContext(ChatContext);

  const unReadNotifications = unReadNotificationsFunc(notifications);
  const modifiedNofitications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return {
      ...n,
      senderName: sender?.name,
    };
  });

  console.log("un", unReadNotifications);
  console.log("mn", modifiedNofitications);

  return (
    <div className="notifications" onClick={() => setIsOpen(!isOpen)}>
      <div className="notifications-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chat-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        </svg>
        {unReadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unReadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationAsRead(notifications)}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNofitications?.length === 0 ? (
            <span className="notification">No notifications yet...</span>
          ) : null}
          {modifiedNofitications &&
            modifiedNofitications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.iSRead ? "notification" : "notification not-read"
                  }
                >
                  <span>{`${n.senderName} sent you a new message`}</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
