"use client";
import React from "react";
// import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
import ChartThree from "@/components/Dashboard/chats/ChartThree";
import DataStatsOne from "@/components/Dashboard/chats/DataStatsOne";
import ChartOne from "@/components/Dashboard/chats/ChatOne";
import MapOne from "@/components/Dashboard/chats/MapOne";
import TableOne from "@/components/Dashboard/chats/TableOne";
import ChartTwo from "@/components/Dashboard/chats/ChartTwo";
import ChatCard from "@/components/Dashboard/chats/ChatCard";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
