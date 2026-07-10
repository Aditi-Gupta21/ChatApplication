import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete, MdForward } from "react-icons/md";

const MessageMenu = ({
  canShowMenu,
  showMenu,
  setShowMenu,
  menuRef,
  onEdit,
  onDelete,
  onForward,
}) => {
  const [openUpward, setOpenUpward] = useState(false);

  if (!canShowMenu) return null;

  const toggleMenu = () => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();

      const menuHeight = 170;

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow >= menuHeight) {
        setOpenUpward(false);
      } else if (spaceAbove >= menuHeight) {
        setOpenUpward(true);
      } else {
        // Choose whichever side has more room
        setOpenUpward(spaceAbove > spaceBelow);
      }
    }

    setShowMenu((prev) => !prev);
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          text-slate-400
          transition-all
          duration-200
          hover:bg-[var(--color-accent-soft)]
          hover:text-[var(--color-accent)]
        "
      >
        <BsThreeDotsVertical size={15} />
      </button>

      {/* Dropdown */}
      {showMenu && (
        <div
          className={`
            absolute
            right-0
            z-50
            w-48
            overflow-hidden
            rounded-2xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-2xl
            transition-all
            duration-150
            ${
              openUpward
                ? "bottom-10 origin-bottom-right"
                : "top-10 origin-top-right"
            }
          `}
        >
          <button
            onClick={() => {
              setShowMenu(false);
              onEdit();
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3.5
              text-sm
              text-[var(--color-ink)]
              transition-all
              duration-150
              hover:bg-[var(--color-accent-soft)]
              hover:text-[var(--color-accent)]
            "
          >
            <MdEdit size={18} />
            Edit Message
          </button>

          <button
            onClick={() => {
              setShowMenu(false);
              onForward();
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3.5
              text-sm
              text-[var(--color-ink)]
              transition-all
              duration-150
              hover:bg-[var(--color-accent-soft)]
              hover:text-[var(--color-accent)]
            "
          >
            <MdForward size={18} />
            Forward
          </button>

          <div className="mx-3 border-t border-[var(--color-border)]" />

          <button
            onClick={() => {
              setShowMenu(false);
              onDelete();
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3.5
              text-sm
              text-red-500
              transition-all
              duration-150
              hover:bg-red-50
            "
          >
            <MdDelete size={18} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageMenu;