import { cn } from "@/lib/utils";
import { Mic, Smile, Plus } from "lucide-react";

const messages = [
  {
    id: 1,
    message: "لقد انتهيت للتو من تحسين الرسم البياني",
    timestamp: "9:30 AM",
    isCurrentUser: true,
  },
  {
    id: 2,
    message:
      "إليك تفاصيل المشروع الذي نعمل عليه حاليًا مع الفريق الجديد:\n\nالاسم: المشروع الرئيسي\nالهدف: تحسين واجهة المستخدم\nالقسم المسؤول: قسم التصميم\nالمراحل: التخطيط، التنفيذ، المتابعة، التقييم",
    timestamp: "9:35 AM",
    isCurrentUser: false,
  },
  {
    id: 3,
    message: "لقد انتهيت للتو من تحسين الرسم البياني",
    timestamp: "10:20 AM",
    isCurrentUser: true,
  },
  {
    id: 4,
    message:
      "إليك تفاصيل المشروع الذي نعمل عليه حاليًا مع الفريق الجديد:\n\nالاسم: المشروع الرئيسي\nالهدف: تحسين واجهة المستخدم\nالقسم المسؤول: قسم التصميم\nالمراحل: التخطيط، التنفيذ، المتابعة، التقييم",
    timestamp: "10:40 AM",
    isCurrentUser: false,
  },
];

interface ChatMessageProps {
  message: string;
  sender?: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

export function ChatMessage({
  message,
  timestamp,
  isCurrentUser = false,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex mb-4",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div className="max-w-[80%]">
        <div
          className={cn(
            "px-4 py-3 text-sm rounded-2xl",
            isCurrentUser
              ? "bg-[#b3e5fc] text-black rounded-tr-sm"
              : "bg-white text-black rounded-tl-sm shadow-sm"
          )}
          dir="rtl"
        >
          {message}
        </div>
        <div
          className={cn(
            "text-[10px] text-gray-500 mt-1 mx-2",
            isCurrentUser ? "text-left" : "text-right"
          )}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
}

export function ChatConversation() {
  return (
    <div className="flex flex-col h-auto bg-white rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.message}
            timestamp={message.timestamp}
            isCurrentUser={message.isCurrentUser}
          />
        ))}
      </div>

      <div className="p-2">
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
          <button className="text-gray-500 p-1">
            <Mic size={20} />
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:outline-none mx-2 text-right"
            placeholder="اكتب رسالة..."
            dir="rtl"
          />
          <button className="text-gray-500 p-1">
            <Smile size={20} />
          </button>
          <button className="bg-[#b3e5fc] rounded-full p-1 ml-2">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
