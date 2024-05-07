import { Session } from "@supabase/supabase-js";

import { UserData } from "./types";
import { initEstate } from "@e-state/solid";
export const { setEstates, createEstate } = initEstate(
  {
    main: {
      session: null as null | Session,
      loading: false,
    },
    persist: { user: null as UserData | null },
  },
  {
    persist: ["persist"],
  }
);
export const { main, persist } = setEstates;
console.log("^_^ ::: file: estate.ts:18 ::: main:\n");
