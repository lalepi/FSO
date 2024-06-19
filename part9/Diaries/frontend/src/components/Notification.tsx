import { NotificationMessage } from "../types";

const Notification = ({ message }: NotificationMessage) => {
  console.log(message);
  if (message === null) {
    return null;
  }
  if (message.includes("Error")) return <div className="error">{message}</div>;
};

export default Notification;
