const DeleteMessageModal = ({
  open,
  onClose,
  onDelete,
  onDeleteForMe,
  isDeleting,
}) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-sm
          rounded-3xl
          bg-white
          shadow-2xl
          animate-[fadeIn_.2s_ease]
        "
      >
        {/* Header */}

        <div className="flex flex-col items-center px-8 pt-8">

          
          <h2 className="text-xl font-bold text-slate-800">
            Delete Message?
          </h2>
        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3 px-6 pb-6">

          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="
              w-full
              rounded-2xl
              bg-red-500
              py-3
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-red-600
              disabled:opacity-60
            "
          >
            {isDeleting
              ? "Deleting..."
              : "Delete for Everyone"}
          </button>

          <button
            onClick={onDeleteForMe}
            disabled={isDeleting}
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              py-3
              font-medium
              text-slate-700
              transition-all
              duration-200
              hover:bg-slate-50
            "
          >
            Delete for Me
          </button>

          <button
            onClick={onClose}
            disabled={isDeleting}
            className="
              w-full
              rounded-2xl
              bg-[var(--color-accent-soft)]
              py-3
              font-medium
              text-[var(--color-accent)]
              transition-all
              duration-200
              hover:bg-[var(--color-accent)]
              hover:text-white
            "
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteMessageModal;