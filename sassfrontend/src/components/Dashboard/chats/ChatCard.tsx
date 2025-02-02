import Link from "next/link";
import Image from "next/image";
export type Chat = {
    active?: any;
    seen?: boolean;
    avatar: string;
    name: string;
    text: string;
    time: string;
    textCount: number;
    dot: number;
  };
  

const chatData: Chat[] = [
  {
    active: true,
    avatar: "",
    name: "Devid Heilo",
    text: "Hello, how are you?",
    time: "12 min",
    textCount: 3,
    dot: 3,
  },
  {
    active: true,
    avatar: "",
    name: "Henry Fisher",
    text: "I am waiting for you",
    time: "5:54 PM",
    textCount: 0,
    dot: 1,
  },
  {
    active: null,
    avatar: "",
    name: "Wilium Smith",
    text: "Where are you now?",
    time: "10:12 PM",
    textCount: 0,
    dot: 3,
  },
  {
    active: true,
    seen: true,
    avatar: "",
    name: "Henry Deco",
    text: "Thank you so much!",
    time: "Sun",
    textCount: 2,
    dot: 6,
  },
  {
    active: false,
    avatar: "",
    name: "Jubin Jack",
    text: "Hello, how are you?",
    time: "Oct 23",
    textCount: 0,
    dot: 3,
  },
];

const ChatCard = () => {
  return (
    <div className="col-span-12 rounded-lg bg-white py-6 shadow-md dark:bg-gray-800 dark:shadow-xl xl:col-span-4">
      <h4 className="mb-5 px-7 text-2xl font-bold text-gray-900 dark:text-white">Chats</h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-4 px-7 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image
                width={56}
                height={56}
                src={chat.avatar || "/profile.jpg"}
                alt="User"
                className="rounded-full"
              />
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
                  chat.active === true ? "bg-green-500" : chat.active === false ? `bg-red-500` : "bg-yellow-500"
                }`}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{chat.name}</h5>
                <p>
                  <span
                    className={`mb-px text-sm font-medium ${
                      chat.seen ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {chat.text}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400"> · {chat.time}</span>
                </p>
              </div>
              {chat.textCount !== 0 && (
                <div className="flex items-center justify-center rounded-full bg-blue-600 px-2 py-0.5">
                  <span className="text-sm font-medium text-white">{chat.textCount}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
