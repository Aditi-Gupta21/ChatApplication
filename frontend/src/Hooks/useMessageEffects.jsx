import { useEffect } from "react";

const useMessageEffects = ({
  scroll,
  message,
  setEditedText,
  menuRef,
  setShowMenu,
}) => {
  // Scroll to latest message
  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message, scroll]);

  // Keep edit text in sync
  useEffect(() => {
    setEditedText(message.message);
  }, [message.message, setEditedText]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [menuRef, setShowMenu]);
};

export default useMessageEffects;