
import { Footer, NavBar } from "@/components";
import Link from "next/link";
import { ChevronRight,Github } from "lucide-react";
import { XBlogArticle } from "@/components/pages/Homepage/BlogCard";
import { Comments } from "@/components/pages/Homepage/Comments";
import { Meteorss } from "@/components/pages/Homepage/meteors-card";
import Questions from "@/components/pages/Homepage/questions";
import ShimmerButton  from "@/components/pages/ui/simmer-button";
import FeaturesCard from "@/components/pages/Homepage/feature-card";
import WobbleCardShow from "@/components/pages/Homepage/wobble-Card";
import { WordReveal } from "@/components/pages/Homepage/WordRevel";

export interface Meteor {
  name: string;
  description: string;
  button_content: string;
  url: string;
}

const meteors_data: Meteor = {
  name: "Join our community",
  description:
    "Join our community to get started and get help.",
  button_content: "Chat with us",
  url: "https://regminimesh.com.np",
};

export default function page() {
  return (
    <>
      <NavBar />
      <section className="w-full px-6 sm:px-48 md:px-40 xl:h-[100vh] ">
        <div className="grid grid-cols-1 gap-10 pb-10 md:pb-40 xl:grid-cols-2">
          <div className="flex flex-col items-start">
            <div className="flex flex-col justify-start pt-4 md:pt-28 lg:pt-28 xl:pt-28">
              <div className="flex  items-center justify-start ">
                {/* Button for top */}
                <div className="relative inline-block">
                  {/* Animated border container */}
                  <div className="absolute inset-[-2px] rounded-full animate-border-rotate">
                    <div className="absolute inset-0 rounded-full " />
                  </div>

                  {/* Main content */}
                  <Link
                    href="#"
                    className="group relative inline-flex items-center gap-2 rounded-full bg px-4 py-2 transition-all dark:bg-gray-900 bg-gray"
                  >
                    <span className="text-lg">🚀</span>
                    <span className="text-base font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      Introducing{" "}
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Ecommerce
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-6 text-base text-gray-400 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <h1 className="relative mb-6 max-w-4xl text-left text-4xl font-bold dark:text-zinc-100 sm:text-7xl md:text-7xl xl:text-7xl">
                  {"Ecommerce: A new SaaS player? Make things easier."}
                </h1>
              </div>

              <div>
                <span className="text-zinc-500 sm:text-xl">
                  Your complete All-in-One solution for buying and selling.
                  Buy awesome product from <span className="text-blue-500">Ecommerce</span>.
                </span>
              </div>

              <div className="mb-4 mt-6 flex w-full flex-col justify-center space-y-4 sm:flex-row sm:justify-start sm:space-x-8 sm:space-y-0">
                <Link href={`/auth/login`}>
                  <ShimmerButton className="mx-auto flex justify-center">
                    <span className="z-10 w-48 whitespace-pre bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center text-sm font-semibold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 dark:text-transparent">
                      Get Started
                    </span>
                  </ShimmerButton>
                </Link>

                <Link href="https://github.com/Nimeshregmi" target="_blank">
                  <div className="flex h-full items-center justify-center">
                    <Github className="mr-2 h-6 w-6" />
                    <span className="text-base font-semibold">
                      {"View on GitHub"}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden h-full w-full xl:block">
            <div className="flex flex-col pt-28">
              <Meteorss meteor={meteors_data} />
              <div className="mt-4 flex w-full justify-between">
                <XBlogArticle />
                <div className="ml-2">
                  <FeaturesCard />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden h-[100vh] w-full xl:block">
        <div className="flex h-full w-full justify-between px-[220px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <WobbleCardShow />
          </div>
          <div className="h-full w-[40%]">
            <div className="flex flex-col pl-[80px]">
              <WordReveal />
            </div>
          </div>
        </div>
      </section>

      <section className="hidden h-auto w-full xl:block mt-40 mb-52">
        <div className="flex h-full w-full justify-between px-[220px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <div className="px-[50px]">
              <Questions />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-8 xl:hidden">
        <Questions />
        </section>

      <section className="w-full px-8 pt-5 sm:px-0 sm:pt-0 md:px-0 md:pt-0 xl:px-0 xl:pt-0">
        <div className="flex h-full w-full flex-col items-center  pt-10">
          <div>
            <h1 className="mb-6 text-center text-3xl font-bold dark:text-zinc-100 md:text-5xl">
              What People Are Saying
            </h1>
          </div>
          <div className="mb-6 text-xl dark:text-zinc-100 md:text-xl">
            Don’t just take our word for it. Here’s what{" "}
            <span className="font-bold">real people</span> are saying about
            Saasfly.
          </div>

          <div className="w-full overflow-x-hidden">
            <Comments />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

