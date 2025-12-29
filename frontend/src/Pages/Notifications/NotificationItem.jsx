import { Archive, Trash2, MailOpen } from "lucide-react";

export default function NotificationItem({
  id,
  icon,
  title,
  message,
  time,
  status,
  isHighlighted = false,
  onMarkAsRead,
  onArchive,
  onDelete,
}) {
  const statusConfig = {
    unread: {
      label: "Unread",
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-l-4 border-blue-500",
    },
    read: {
      label: "Read",
      color: "bg-slate-100 text-slate-600",
      borderColor: "",
    },
    archived: {
      label: "Archived",
      color: "bg-slate-200 text-slate-500",
      borderColor: "",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 p-4 ${
        config.borderColor
      } ${status === "archived" ? "opacity-60" : ""}`}
    >
      <div
        className={`p-3 rounded-full ${
          status === "unread" ? "bg-blue-50" : "bg-slate-50"
        }`}
      >
        {icon}
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3
            className={`font-semibold ${
              status === "unread" ? "text-slate-900" : "text-slate-600"
            }`}
          >
            {title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <span className="text-xs text-slate-500">{time}</span>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
            >
              {config.label}
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-600">{message}</p>
      </div>

      <div className="flex flex-col gap-2 flex-shrink-0">
        {status !== "archived" && (
          <button
            onClick={() => onArchive?.(id)}
            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
            title="Archive"
          >
            <Archive size={18} />
          </button>
        )}
        {status === "unread" && onMarkAsRead && (
          <button
            onClick={() => onMarkAsRead(id)}
            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
            title="Mark as read"
          >
            <MailOpen size={18} />
          </button>
        )}
        <button
          onClick={() => onDelete?.(id)}
          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
