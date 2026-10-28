
"use client";

import { useState, type FormEvent } from "react";
import rules from "./rules.json";

type Rule = {
  intent: string;
  keywords: string[];
  reply: string;
};

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

type MenuItem = {
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  popular?: boolean;
};

const botRules = rules as Rule[];

const menuItems: MenuItem[] = [
  {
    name: "Classic Chicken Burger",
    description: "Juicy chicken patty with fresh vegetables and our special sauce.",
    price: 350,
    emoji: "🍔",
    category: "Burgers",
    popular: true,
  },
  {
    name: "Crispy Zinger Burger",
    description: "Crispy, crunchy chicken with creamy mayo and lettuce.",
    price: 450,
    emoji: "🍔",
    category: "Burgers",
    popular: true,
  },
  {
    name: "Double Cheese Burger",
    description: "A satisfying burger with extra cheese and a toasted bun.",
    price: 550,
    emoji: "🍔",
    category: "Burgers",
  },
  {
    name: "Small Pizza",
    description: "A cheesy pizza topped with delicious classic flavours.",
    price: 650,
    emoji: "🍕",
    category: "Pizza",
  },
  {
    name: "Large Pizza",
    description: "A large sharing pizza with cheese and tasty toppings.",
    price: 1200,
    emoji: "🍕",
    category: "Pizza",
    popular: true,
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic rice with traditional spices and tender chicken.",
    price: 250,
    emoji: "🍛",
    category: "Desi Food",
    popular: true,
  },
  {
    name: "Chicken Karahi",
    description: "A desi favourite prepared with a rich tomato-based masala.",
    price: 1100,
    emoji: "🥘",
    category: "Desi Food",
  },
  {
    name: "Chicken Pulao",
    description: "Fragrant rice cooked with traditional spices.",
    price: 280,
    emoji: "🍚",
    category: "Desi Food",
  },
  {
    name: "Masala Fries",
    description: "Golden crispy fries sprinkled with special seasoning.",
    price: 180,
    emoji: "🍟",
    category: "Sides & Drinks",
  },
  {
    name: "Cold Drink",
    description: "A chilled soft drink to go with your meal.",
    price: 100,
    emoji: "🥤",
    category: "Sides & Drinks",
  },
  {
    name: "Chocolate Brownie",
    description: "A rich chocolate treat for a sweet finish.",
    price: 220,
    emoji: "🍫",
    category: "Desserts",
  },
  {
    name: "Ice Cream",
    description: "A cool and creamy dessert.",
    price: 180,
    emoji: "🍨",
    category: "Desserts",
  },
];

const deals = [
  {
    name: "Student Deal",
    emoji: "🎓",
    price: 399,
    tag: "STUDENT FAVOURITE",
    description: "1 Zinger Burger + Fries + Cold Drink",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Family Feast",
    emoji: "👨‍👩‍👧‍👦",
    price: 1499,
    tag: "SHARE THE LOVE",
    description: "2 Large Pizzas + 1.5L Drink",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Biryani Combo",
    emoji: "🍛",
    price: 299,
    tag: "DESI SPECIAL",
    description: "Chicken Biryani + Raita",
    color: "from-red-500 to-rose-600",
  },
];

const categories = [
  "All",
  "Burgers",
  "Pizza",
  "Desi Food",
  "Sides & Drinks",
  "Desserts",
];

const quickTopics = [
  "Menu",
  "Deals",
  "Timings",
  "Location",
  "Delivery",
  "Payment",
];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findReply(message: string): string {
  const normalized = message.toLowerCase().trim();

  for (const rule of botRules) {
    for (const keyword of rule.keywords) {
      const pattern = new RegExp(
        `\\b${escapeRegex(keyword.toLowerCase())}\\b`,
        "i"
      );

      if (pattern.test(normalized)) {
        return rule.reply;
      }
    }
  }

  return "😊 Sorry, I didn't quite understand that.\n\nTry asking about our menu, deals, timings, location, delivery, payment or how to order. I'm happy to help!";
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "👋 Welcome to Desi Bites!\n\nI'm your restaurant assistant. Ask me about our menu, deals, delivery, timings or anything else!",
    },
  ]);

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || isTyping) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        sender: "user",
        text: trimmed,
      },
    ]);

    setInput("");
    setIsTyping(true);

    const reply = findReply(trimmed);

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: reply,
        },
      ]);
      setIsTyping(false);
    }, 600);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] text-slate-900">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatFood {
          0%, 100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-15px) rotate(4deg);
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulseRing {
          0% {
            box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.38);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(234, 88, 12, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(234, 88, 12, 0);
          }
        }

        .fade-up {
          animation: fadeUp 0.75s ease-out both;
        }

        .float-food {
          animation: floatFood 4s ease-in-out infinite;
        }

        .pop-in {
          animation: popIn 0.55s ease-out both;
        }

        .chat-enter {
          animation: slideIn 0.25s ease-out both;
        }

        .support-pulse {
          animation: pulseRing 2.4s infinite;
        }

        .menu-card {
          animation: fadeUp 0.45s ease-out both;
        }

        .menu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 35px rgba(124, 45, 18, 0.10);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
              🍔
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">
                Desi <span className="text-orange-600">Bites.</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Taste the happiness
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a className="transition hover:text-orange-600" href="#home">Home</a>
            <a className="transition hover:text-orange-600" href="#menu">Our Menu</a>
            <a className="transition hover:text-orange-600" href="#deals">Special Deals</a>
            <a className="transition hover:text-orange-600" href="#about">About Us</a>
          </div>

          <a
            href="#menu"
            className="rounded-full bg-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-700 sm:px-5"
          >
            Explore Menu <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute -right-28 -top-20 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
          <div className="fade-up relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm">
              <span>✨</span> Fresh flavours, happy hearts
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Good food.
              <br />
              <span className="text-orange-600">Great mood.</span>
              <br />
              Every time.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              From delicious desi favourites to cheesy pizza and juicy burgers,
              discover flavours that make every meal special.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="rounded-full bg-orange-600 px-7 py-3.5 font-bold text-white shadow-xl shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-700"
              >
                Explore Our Menu →
              </a>
              <a
                href="#deals"
                className="rounded-full border border-orange-200 bg-white px-7 py-3.5 font-bold text-slate-800 transition hover:-translate-y-1 hover:border-orange-400 hover:text-orange-600"
              >
                View Special Deals
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-5 text-sm text-slate-600">
              <span>🍽️ Made for food lovers</span>
              <span>🧡 Full of flavour</span>
            </div>
          </div>

          <div className="pop-in relative mx-auto flex min-h-[320px] w-full max-w-xl items-center justify-center sm:min-h-[450px]">
            <div className="absolute h-64 w-64 rounded-full bg-orange-200 sm:h-80 sm:w-80" />
            <div className="absolute h-52 w-52 rounded-full border border-orange-300 sm:h-72 sm:w-72" />

            <div className="float-food relative z-10 flex h-60 w-60 items-center justify-center rounded-full border-[10px] border-white bg-gradient-to-br from-amber-100 to-orange-200 text-[125px] shadow-2xl shadow-orange-200/70 sm:h-80 sm:w-80 sm:text-[170px]">
              🍔
            </div>

            <div className="float-food absolute left-1 top-10 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-xl sm:left-2 sm:h-20 sm:w-20 sm:text-5xl">
              🍕
            </div>

            <div
              className="float-food absolute bottom-10 right-0 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-xl sm:right-2 sm:h-20 sm:w-20 sm:text-5xl"
              style={{ animationDelay: "1s" }}
            >
              🍟
            </div>

            <div className="absolute right-0 top-8 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl sm:right-3">
              <p className="text-xs font-semibold text-slate-500">Made with</p>
              <p className="font-black text-orange-600">❤️ Love & spice</p>
            </div>

            <div className="absolute bottom-5 left-0 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl sm:bottom-8 sm:left-2">
              <p className="text-xs font-semibold text-slate-500">Something tasty?</p>
              <p className="font-black">Let's eat! 😋</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8">
          {[
            { emoji: "🍳", title: "Flavour-packed menu", text: "Something for every craving" },
            { emoji: "🎉", title: "Exciting deals", text: "Delicious combinations at demo prices" },
            { emoji: "💬", title: "Friendly support", text: "Chat with our virtual assistant" },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="fade-up flex items-center gap-4 rounded-2xl p-3 transition hover:bg-orange-50"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                {feature.emoji}
              </div>
              <div>
                <h2 className="font-extrabold">{feature.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="fade-up text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-orange-600">
              Delicious choices
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Explore Our Menu
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              From crispy bites to traditional favourites, find something
              delicious for your next meal.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 ${
                  selectedCategory === category
                    ? "border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-200"
                    : "border-orange-100 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <article
                key={item.name}
                className="menu-card group overflow-hidden rounded-3xl border border-orange-100 bg-white transition duration-300"
                style={{ animationDelay: `${(index % 4) * 80}ms` }}
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100">
                  <span className="text-7xl transition duration-300 group-hover:scale-125">
                    {item.emoji}
                  </span>

                  {item.popular && (
                    <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      Popular
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-600">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-extrabold">{item.name}</h3>
                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-orange-100 pt-4">
                    <span className="text-lg font-black text-orange-600">
                      Rs. {item.price.toLocaleString("en-PK")}
                    </span>
                    <button
                      onClick={() => {
                        setChatOpen(true);
                        setInput(`I want to order ${item.name}`);
                      }}
                      className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 transition hover:bg-orange-600 hover:text-white"
                    >
                      Enquire ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-xs text-slate-400">
            Menu and prices are for demonstration purposes only.
          </p>
        </div>
      </section>

      {/* Deals */}
      <section
        id="deals"
        className="scroll-mt-24 bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="fade-up flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-orange-400">
                A little extra happiness
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Deals You&apos;ll <span className="text-orange-400">Love!</span>
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">
                Great combinations for students, families and serious food lovers.
              </p>
            </div>

            <a
              href="#menu"
              className="w-fit rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-orange-400 hover:bg-orange-500"
            >
              Explore Full Menu →
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {deals.map((deal, index) => (
              <article
                key={deal.name}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-2 hover:border-orange-400/60 hover:bg-white/[0.1]"
                style={{
                  animation: "fadeUp 0.65s ease-out both",
                  animationDelay: `${index * 160}ms`,
                }}
              >
                <div className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${deal.color}`}>
                  <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/20" />
                  <div className="absolute -bottom-16 -left-5 h-40 w-40 rounded-full border border-white/20" />
                  <span className="relative text-7xl transition duration-300 group-hover:scale-125">
                    {deal.emoji}
                  </span>
                  <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black tracking-wider text-white backdrop-blur-sm">
                    {deal.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black">{deal.name}</h3>
                  <p className="mt-3 min-h-[48px] leading-6 text-slate-300">
                    {deal.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-xs text-slate-400">Combo price</p>
                      <p className="mt-1 text-2xl font-black text-orange-400">
                        Rs. {deal.price.toLocaleString("en-PK")}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setChatOpen(true);
                        setInput(`Tell me about the ${deal.name}`);
                      }}
                      className="rounded-full bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-400"
                    >
                      Ask About Deal
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-xs text-slate-400">
            All deals and prices are fictional examples for this project.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:p-14">
          <div className="fade-up">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-orange-600">
              Welcome to Desi Bites
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Every craving deserves a little celebration.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Desi Bites is a demo restaurant concept inspired by the flavours
              we love. Our sample menu brings together burgers, pizzas, desi
              favourites, sides and sweet treats in one place.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Explore the menu, discover sample deals or open the customer
              support chat for quick answers.
            </p>

            <a
              href="#menu"
              className="mt-7 inline-flex rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-orange-700"
            >
              Discover Our Food →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex min-h-40 flex-col items-center justify-center rounded-3xl bg-orange-50 p-5 text-center transition hover:rotate-2">
              <span className="text-5xl">🍕</span>
              <h3 className="mt-3 font-extrabold">Fresh cravings</h3>
              <p className="mt-1 text-xs text-slate-500">A little something for everyone</p>
            </div>
            <div className="mt-8 flex min-h-40 flex-col items-center justify-center rounded-3xl bg-amber-50 p-5 text-center transition hover:-rotate-2">
              <span className="text-5xl">🍛</span>
              <h3 className="mt-3 font-extrabold">Desi favourites</h3>
              <p className="mt-1 text-xs text-slate-500">Comfort food classics</p>
            </div>
            <div className="flex min-h-40 flex-col items-center justify-center rounded-3xl bg-rose-50 p-5 text-center transition hover:-rotate-2">
              <span className="text-5xl">🍔</span>
              <h3 className="mt-3 font-extrabold">Tasty bites</h3>
              <p className="mt-1 text-xs text-slate-500">Burgers and more</p>
            </div>
            <div className="mt-8 flex min-h-40 flex-col items-center justify-center rounded-3xl bg-yellow-50 p-5 text-center transition hover:rotate-2">
              <span className="text-5xl">🍨</span>
              <h3 className="mt-3 font-extrabold">Sweet endings</h3>
              <p className="mt-1 text-xs text-slate-500">Save room for dessert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 rounded-3xl bg-orange-100 px-6 py-8 text-center sm:flex-row sm:text-left sm:px-10">
          <div>
            <h2 className="text-2xl font-black">Need a little help? 💬</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Click the customer support icon to ask about the menu, deals or demo restaurant details.
            </p>
          </div>
          <button
            onClick={() => setChatOpen(true)}
            className="shrink-0 rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-orange-700"
          >
            Chat with Us →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-9 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xl font-black">
              Desi <span className="text-orange-400">Bites.</span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Good food. Great mood. Every time.
            </p>
          </div>

          <div className="text-sm leading-6 text-slate-400">
            <p>Demo restaurant concept · Sargodha, Pakistan</p>
            <p>© {new Date().getFullYear()} Desi Bites. Student project.</p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-7xl text-center text-xs text-slate-500">
          Sample menu, prices, address, contact details and deals are fictional and are not verified business information.
        </p>
      </footer>

      {/* Floating customer support button */}
      <button
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        aria-label={chatOpen ? "Close customer support chat" : "Open customer support chat"}
        aria-expanded={chatOpen}
        className={`support-pulse fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-3xl text-white shadow-2xl shadow-orange-300 transition duration-300 hover:scale-110 hover:bg-orange-700 sm:bottom-7 sm:right-7 ${
          chatOpen ? "rotate-0" : ""
        }`}
      >
        {chatOpen ? "✕" : "💬"}
      </button>

      {/* Chat window: only rendered when the icon is clicked */}
      {chatOpen && (
        <section
          aria-label="Customer support chat"
          className="chat-enter fixed bottom-24 right-3 z-50 flex h-[min(570px,calc(100dvh-140px))] w-[calc(100vw-24px)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl shadow-slate-900/20 sm:bottom-28 sm:right-7"
        >
          <header className="flex items-center gap-3 bg-orange-600 px-4 py-4 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl">
              🍔
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-extrabold">Desi Bites Support</h2>
              <p className="mt-0.5 flex items-center gap-2 text-xs text-orange-100">
                <span className="h-2 w-2 rounded-full bg-green-300" />
                Virtual assistant
              </p>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/20"
            >
              ✕
            </button>
          </header>

          <div className="border-b border-orange-100 bg-orange-50 px-3 py-3">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-orange-700">
              Quick questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickTopics.map((topic) => (
                <button
                  key={topic}
                  disabled={isTyping}
                  onClick={() => sendMessage(topic)}
                  className="rounded-full border border-orange-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-600 hover:text-white disabled:opacity-50"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-white p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm">
                    🍔
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-sm leading-6 ${
                    message.sender === "user"
                      ? "rounded-br-sm bg-orange-600 text-white"
                      : "rounded-bl-sm border border-orange-100 bg-orange-50 text-slate-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-sm">
                  🍔
                </div>
                <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-slate-500">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-orange-100 bg-white p-3"
          >
            <label htmlFor="support-message" className="sr-only">
              Type a message
            </label>

            <input
              id="support-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask us anything..."
              autoComplete="off"
              disabled={isTyping}
              className="min-w-0 flex-1 rounded-full border border-orange-200 bg-orange-50 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="rounded-full bg-orange-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
