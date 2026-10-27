
"use client";

import { useState } from "react";

type Rule = {
  intent: string;
  keywords: string[];
  reply: string;
};

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const chatbotRules: Rule[] = [
  {
    intent: "fees",
    keywords: ["fee", "fees", "dues", "payment", "challan"],
    reply: "Please visit the University of Sargodha fee section or your student portal to check fee details, dues, and payment instructions. The accounts office can also provide assistance.",
  },
  {
    intent: "admission",
    keywords: ["admission", "apply", "deadline", "registration", "merit"],
    reply: "For admissions, please check the University of Sargodha admission portal for the latest eligibility criteria, deadline, merit list, and application process.",
  },
  {
    intent: "timings",
    keywords: ["timing", "timings", "hours", "office hour", "open"],
    reply: "University office timings may vary by department. Please contact your relevant department or check the official university website for current timings.",
  },
  {
    intent: "library",
    keywords: ["library", "book", "books", "issue", "return"],
    reply: "The University of Sargodha library supports book search, borrowing, and return services. Please contact the library or use its official portal for availability and issuing details.",
  },
  {
    intent: "hostel",
    keywords: ["hostel", "accommodation", "room", "residence"],
    reply: "For hostel accommodation, please contact the university hostel administration or visit the official website for application requirements, availability, and deadlines.",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Assalam-o-Alaikum! 👋 Welcome to UOS Helpdesk Bot. I can help you with fees, admissions, university timings, library and hostel information. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  function getReply(message: string): string {
    const normalizedMessage = message
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    const matchedRule = chatbotRules.find((rule) =>
      rule.keywords.some((keyword) =>
        normalizedMessage.includes(keyword.toLowerCase())
      )
    );

    if (matchedRule) {
      return matchedRule.reply;
    }

    return "Sorry, I could not understand your question. Please ask about fees, admissions, timings, library or hostel. You can also contact the relevant university office for assistance.";
  }

  function sendMessage() {
    const text = input.trim();

    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    const botMessage: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: getReply(text),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      botMessage,
    ]);

    setInput("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4 py-8 sm:px-6">
      <div className="mx-auto flex h-[85vh] min-h-[540px] max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl shadow-indigo-200/50">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 px-5 py-5 text-white sm:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl">
              🎓
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-wide sm:text-2xl">
                UOS Helpdesk Bot
              </h1>
              <p className="mt-1 text-sm text-purple-100">
                University of Sargodha · Student Support
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-purple-100">
            <span className="h-2 w-2 rounded-full bg-green-300" />
            Online · Rule-based assistant
          </div>
        </header>

        {/* Messages */}
        <section
          aria-label="Chat messages"
          aria-live="polite"
          className="flex-1 space-y-5 overflow-y-auto bg-gradient-to-b from-slate-50 to-purple-50/60 p-4 sm:p-6"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[75%] ${
                  message.sender === "user"
                    ? "rounded-br-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "rounded-bl-sm border border-purple-100 bg-white text-slate-700"
                }`}
              >
                {message.text}
              </div>

              {message.sender === "user" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-lg">
                  👤
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Input */}
        <form
          className="border-t border-purple-100 bg-white p-4 sm:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <label
            htmlFor="chat-input"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Ask your question
          </label>

          <div className="flex items-center gap-2">
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="e.g. What is the admission deadline?"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-2xl border border-purple-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:scale-[1.02] hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              Send ↗
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-slate-400">
            UOS Student Helpdesk · Ask about fees, admissions, timings,
            library or hostel
          </p>
        </form>
      </div>
    </main>
  );
}
