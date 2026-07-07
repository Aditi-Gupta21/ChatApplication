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
    <div className="flex flex-col gap-2 min-w-[250px]">

      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        disabled={isSaving}
        rows={2}
        className="w-full bg-transparent outline-none border border-gray-500 rounded-lg px-3 py-2 text-inherit resize-none"
      />

      <div className="flex justify-end gap-2">

        <button
          onClick={() => {
            setEditedText(originalMessage);
            onCancel();
          }}
          disabled={isSaving}
          className="px-3 py-1 rounded-md text-xs bg-zinc-700 hover:bg-zinc-600 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-3 py-1 rounded-md text-xs bg-green-600 hover:bg-green-500 transition"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

      </div>

    </div>
  );
};

export default EditMessageInput;