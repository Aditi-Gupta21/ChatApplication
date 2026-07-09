// React
import React, { useRef, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { editMessage, deleteMessage, removeMessage } from "../redux/messageSlice";
import { updateConversation } from "../redux/conversationSlice";

// Custom Hooks
import useMessageEffects from "../Hooks/useMessageEffects";
import useMessageActions from "../Hooks/useMessageActions";

// Components
import MessageBubble from "./chat/MessageBubble";
import DeleteMessageModal from "./chat/DeleteMessageModal";
import ForwardMessageModal from "./chat/ForwardMessageModal";


const Message = ({ message }) => {
  // ======================= REFS =======================

  const scroll = useRef();
  const menuRef = useRef();

  // ======================= REDUX =======================

  const dispatch = useDispatch();

  const { authUser, selectedUser } = useSelector(
    (store) => store.user
  );

  const { conversations } = useSelector(
    (store) => store.conversation
  );

  const { otherUsers } = useSelector(
    (store) => store.user
  );

  // ======================= LOCAL STATE =======================

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.message);

  const [showMenu, setShowMenu] = useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [showForwardModal, setShowForwardModal] =
    useState(false);

  const [selectedUsers, setSelectedUsers] =
    useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);

  // ======================= DERIVED VALUES =======================

  const isSender =
    authUser?._id === message.senderId;

  const avatar = isSender
    ? authUser?.profilePhoto
    : selectedUser?.profilePhoto;

  const canShowMenu =
    isSender &&
    !message.deletedForEveryone;

  // ======================= CUSTOM HOOKS =======================

  useMessageEffects({
    scroll,
    message,
    setEditedText,
    menuRef,
    setShowMenu,
  });

  const {
    scrollToMessage,
    handleKeyDown,
    handleSave,
    handleDelete,
    handleDeleteForMe,
    handleForward
  } = useMessageActions({
    message,
    selectedUser,
    selectedUsers,

    editedText,
    setEditedText,

    setIsEditing,
    setShowMenu,

    setShowDeleteModal,

    setShowForwardModal,
    setSelectedUsers,

    setIsSaving,
    setIsDeleting,
    setIsForwarding,

    dispatch,

    editMessage,
    deleteMessage,
    removeMessage,
    updateConversation,

    scroll,
  });

  // ======================= UI HANDLERS =======================
  const openEditMode = () => {
    setEditedText(message.message);
    setIsEditing(true);
    setShowMenu(false);
    scrollToMessage();
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setShowMenu(false);
    scrollToMessage();
  };

  const openForwardModal = () => {
    setShowForwardModal(true);
    setShowMenu(false);
  };


  return (
    <div ref={scroll}>
      <div
        className={`mb-4 flex items-end gap-2 md:gap-3 ${isSender ? "justify-end" : "justify-start"
          }`}
      >
        {/* Receiver Avatar */}
        {!isSender && (
          <img
            src={avatar}
            alt="avatar"
            className="h-8 w-8 shrink-0 rounded-full border border-[var(--color-border)] object-cover md:h-10 md:w-10"
          />
        )}

        {/* Message Content */}
        <div className="max-w-[82%] md:max-w-[70%]">
          <MessageBubble
            isSender={isSender}
            message={message}
            canShowMenu={canShowMenu}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            menuRef={menuRef}
            onForward={openForwardModal}
            onEdit={openEditMode}
            onDelete={openDeleteModal}
            isEditing={isEditing}
            editedText={editedText}
            setEditedText={setEditedText}
            handleSave={handleSave}
            isSaving={isSaving}
            handleKeyDown={handleKeyDown}
            onCancel={() => setIsEditing(false)}
          />
        </div>

        {/* Sender Avatar */}
        {isSender && (
          <img
            src={avatar}
            alt="avatar"
            className="h-8 w-8 shrink-0 rounded-full border border-[var(--color-border)] object-cover md:h-10 md:w-10"
          />
        )}
      </div>

      <DeleteMessageModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        onDeleteForMe={handleDeleteForMe}
        isDeleting={isDeleting}
      />

      <ForwardMessageModal
        open={showForwardModal}
        onClose={() => {
          setShowForwardModal(false);
          setSelectedUsers([]);
        }}
        users={otherUsers}
        conversations={conversations}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        onForward={handleForward}
        isForwarding={isForwarding}
        currentChatUserId={selectedUser._id}
      />

    </div>
  );

};

export default Message;