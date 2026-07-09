const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 px-1 py-2">
      {[...Array(6)].map((_, index) => {
        const isSender = index % 2 !== 0;
        const width = 30 + ((index * 17) % 40); // varied widths, feels less robotic

        return (
          <div
            key={index}
            className={`flex items-end gap-2 md:gap-3 ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {!isSender && (
              <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-slate-200 md:h-10 md:w-10" />
            )}

            <div
              className={`
                animate-pulse
                rounded-3xl
                px-4
                py-4
                ${
                  isSender
                    ? "rounded-br-lg bg-slate-200"
                    : "rounded-bl-lg border border-[var(--color-border)] bg-slate-100"
                }
              `}
              style={{ width: `${width}%`, maxWidth: "260px" }}
            >
              <div className="h-3 w-full rounded-full bg-slate-300/70" />
              <div className="mt-2 h-3 w-2/3 rounded-full bg-slate-300/70" />
            </div>

            {isSender && (
              <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-slate-200 md:h-10 md:w-10" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;