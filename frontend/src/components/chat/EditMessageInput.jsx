import { FiCheck, FiX } from "react-icons/fi";

const EditMessageInput = ({
  editedText,
  setEditedText,
  handleSave,
  isSaving,
  originalMessage,
  onCancel,
  handleKeyDown,
}) => {
  return (
    <div className="w-full">

      {/* Edit Input */}
      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        disabled={isSaving}
        rows={2}
        placeholder="Edit message..."
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-white/20
          bg-white/10
          px-4
          py-3
          text-[15px]
          leading-6
          text-inherit
          outline-none
          transition-all
          duration-200
          focus:border-white/40
          focus:bg-white/15
        "
      />

      {/* Bottom Row */}
      <div className="mt-2 flex items-center justify-between">

        <span className="text-[11px] italic text-white/60">
          Editing message
        </span>

        <div className="flex items-center gap-2">

          {/* Cancel */}
          <button
            onClick={() => {
              setEditedText(originalMessage);
              onCancel();
            }}
            disabled={isSaving}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-white/70
              transition-all
              duration-200
              hover:bg-white/10
              hover:text-white
              disabled:opacity-50
            "
          >
            <FiX size={18} />
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[var(--color-accent)]
              text-white
              transition-all
              duration-200
              hover:scale-105
              hover:brightness-110
              disabled:opacity-50
            "
          >
            {isSaving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <FiCheck size={18} />
            )}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditMessageInput;