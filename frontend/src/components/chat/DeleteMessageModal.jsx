const DeleteMessageModal = ({
  open,
  onClose,
  onDelete,
  onDeleteForMe,
  isDeleting,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-zinc-900 rounded-xl p-6 w-80 shadow-xl">

        <h2 className="text-lg font-semibold mb-5">
          Delete Message
        </h2>

        <div className="flex flex-col gap-3">

          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="btn btn-error"
          >
            {isDeleting
              ? "Deleting..."
              : "Delete for Everyone"}
          </button>

          <button
            onClick={onDeleteForMe}
            disabled={isDeleting}
            className="btn btn-outline"
          >
            Delete for Me
          </button>

          <button
            onClick={onClose}
            disabled={isDeleting}
            className="btn"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteMessageModal;