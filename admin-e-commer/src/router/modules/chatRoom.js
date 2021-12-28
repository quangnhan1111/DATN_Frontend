/** When your routing table is too long, you can split it into small modules**/

import ChatRooms from "../../views/ChatRoom/ChatRooms";
import AddChatRoom from "../../views/ChatRoom/AddChatRoom";
import EditChatRoom from "../../views/ChatRoom/EditChatRoom";

const chatRoom = [
  {
    path: '/chatroom/',
    name: 'ChatRooms',
    component: ChatRooms
  },
  {
    path: '/add-chat-room/',
    name: 'AddChatRoom',
    component: AddChatRoom
  },
  {
    path: '/edit-chat-room/:id',
    name: 'EditChatroom',
    component: EditChatRoom
  },
]

export default chatRoom
