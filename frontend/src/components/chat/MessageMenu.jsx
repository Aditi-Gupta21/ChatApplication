import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

const MessageMenu = ({
  canShowMenu,
  showMenu,
  setShowMenu,
  menuRef,
  onEdit,
  onDelete,
}) => {
  if (!canShowMenu) return null;

  return (
    <div ref={menuRef} className="relative">

      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="p-1 rounded hover:bg-zinc-700 transition-colors"
      >
        <BsThreeDotsVertical className="text-sm" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-zinc-800 shadow-lg z-50">

          <button
            onClick={onEdit}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 transition-colors"
          >
            <MdEdit />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-600 transition-colors"
          >
            <MdDelete />
            Delete
          </button>

        </div>
      )}

    </div>
  );
};

export default MessageMenu;