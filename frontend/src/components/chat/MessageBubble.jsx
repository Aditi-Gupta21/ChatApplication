import EditMessageInput from "./EditMessageInput";
import MessageMenu from "./MessageMenu";

const MessageBubble = ({
  isSender,
  message,

  canShowMenu,
  showMenu,
  setShowMenu,
  menuRef,
  onForward,
  onEdit,
  onDelete,

  isEditing,
  editedText,
  setEditedText,
  handleSave,
  isSaving,
  handleKeyDown,
  onCancel,
}) => {
  return (
    <div className="max-w-full">
      {/* Header */}
      <div
        className={`mb-1 flex items-center gap-2 px-1 ${
          isSender ? "justify-end" : "justify-start"
        }`}
      >
        <span className="select-none text-[11px] font-medium text-slate-400">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        {isSender && (
          <span
            className={`text-[11px] font-semibold ${
              message.seen ? "text-[var(--color-accent)]" : "text-slate-400"
            }`}
          >
            {message.seen ? "✓✓" : "✓"}
          </span>
        )}

        <MessageMenu
          canShowMenu={canShowMenu}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          menuRef={menuRef}
          onForward={onForward}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Bubble */}
      <div
        className={`
          relative
          max-w-md
          rounded-3xl
          px-4
          py-2.5
          shadow-sm
          transition-all
          duration-200
          hover:shadow-md
          ${
            isSender
              ? "rounded-br-lg bg-[var(--color-accent)] text-white "
              : "rounded-bl-lg border border-[var(--color-border)] bg-[var(--color-white)] border border-slate-200 text-[var(--color-ink)]"
          }
        `}
      >
        {isEditing ? (
          
          <EditMessageInput
            editedText={editedText}
            setEditedText={setEditedText}
            handleSave={handleSave}
            isSaving={isSaving}
            originalMessage={message.message}
            handleKeyDown={handleKeyDown}
            onCancel={onCancel}
          />
        ) : (
          <>
            {message.deletedForEveryone ? (
              <p
                className={`flex items-center gap-1.5 text-xs italic ${
                  isSender ? "text-white/50" : "text-slate-400"
                }`}
              >
                🚫 This message was deleted
              </p>
            ) : (
              <>
                {message.forwarded && (
                  <p
                    className={`mb-2 flex items-center gap-1 text-[11px] italic ${
                      isSender ? "text-white/50" : "text-slate-400"
                    }`}
                  >
                    ↪ Forwarded
                  </p>
                )}

                <p className="whitespace-pre-wrap break-words text-[15px] leading-6">
                  {message.message}
                </p>

                {message.edited && (
                  <p
                    className={`mt-3 text-right text-[10px] italic tracking-wide ${
                      isSender ? "text-white/50" : "text-slate-400"
                    }`}
                  >
                    edited
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;