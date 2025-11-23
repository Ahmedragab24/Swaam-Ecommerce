import { Gavel } from "lucide-react";
import Model from "./model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

const messages = [
  {
    id: 1,
    sender: "حسين صادق",
    text: "أهلاً وسهلاً بك في متجرنا",
    time: "10:45 AM",
    date: "20/3/2025",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-chart-1",
  },
  {
    id: 2,
    sender: "أنت",
    text: "أريد شراء حقيبة يد باللون الأحمر بسعر 150 ريال أو أقل",
    time: "10:47 AM",
    date: "20/3/2025",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-chart-2",
    isMe: true,
  },
  {
    id: 3,
    sender: "حسين صادق",
    text: "لدينا عدة خيارات متاحة",
    time: "10:48 AM",
    date: "20/3/2025",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-chart-3",
  },
  {
    id: 4,
    sender: "أنت",
    text: "أريد شراء حقيبة يد باللون الأحمر بسعر 150 ريال أو أقل",
    time: "10:49 AM",
    date: "25/3/2025",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-chart-4",
    isMe: true,
  },
  {
    id: 5,
    sender: "حسين صادق",
    text: "متوفر بسعر 120 ريال",
    time: "7:45 AM",
    date: "26/3/2025",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-chart-5",
  },
  {
    id: 6,
    sender: "أنت",
    text: "أريد شراء حقيبة يد باللون الأحمر بسعر 150 ريال أو أقل",
    time: "10:52 AM",
    date: "26/3/2025",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-chart-6",
    isMe: true,
  },
  {
    id: 7,
    sender: "حسين صادق",
    text: "متوفر بسعر 120 ريال",
    time: "7:45 AM",
    date: "26/3/2025",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-chart-3",
  },
];

const BtnAuctionDetails = () => {
  return (
    <Model
      BtnStyle="text-lg font-bold !px-20 h-11"
      BtnIcon={<Gavel className="w-8 h-8" />}
      BtnTitle="مزايدة"
      ModelTitle="المزايده علي شنطة"
    >
      <ScrollArea className="h-[80vh] w-auto rounded-md border">
        <div
          className="relative max-w-md mx-auto min-h-screen lg:min-h-[40vh]  flex flex-col"
          dir="rtl"
        >
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                {/* Avatar */}
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-600 text-white text-sm">
                    {message.sender.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div className="flex-1">
                  {/* Message Bubble */}
                  <div
                    className={`${message.bgColor} rounded-2xl rounded-tr-sm px-4 py-3 max-w-[280px]`}
                  >
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {message.text}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <div className="mt-1 text-xs text-gray-500 text-right">
                    {message.date} {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white rounded-4xl border-t sticky bottom-0 z-10">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="كتابة الرسالة..."
                  className="pr-4 pl-12 py-3 rounded-full border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <Button
                size="icon"
                className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Model>
  );
};

export default BtnAuctionDetails;
