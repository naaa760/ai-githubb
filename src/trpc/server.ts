"use server";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCaller, type AppRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";

const createContext = cache(async () => {
  const res = await fetch("/api/get-headers");
  const headers = await res.json();
  headers["x-trpc-source"] = "rsc";
  return createTRPCContext({
    headers: new Headers(headers),
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
