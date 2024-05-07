import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createEffect, onCleanup } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { createEstate, main, persist } from "./utils/estate";
import { supabase } from "./utils/supabase";
import { MetaProvider, Title } from "@solidjs/meta";
import { NoHydration } from "solid-js/web";

export default function App() {
  const { session } = createEstate("main");
  supabase.auth.getSession().then(({ data: { session } }) => {
    main({ session });
  });

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    main({ session });
  });
  onCleanup(() => {
    data.subscription.unsubscribe();
  });
  createEffect(async () => {
    const s = session();
    if (s) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", s.user.id)
        .single();
      persist({ user: data });
    }
  });

  return (
      <Router
        root={(props) => (
          <MetaProvider>
            <Title>SolidStart - Basic</Title>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
  );
}
