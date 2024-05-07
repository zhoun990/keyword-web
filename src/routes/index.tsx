import { For, Show } from "solid-js";
import Counter from "~/components/Counter";
import { createEstate } from "~/utils/estate";
import { supabase } from "~/utils/supabase";
import { PostComponent } from "../components/PostComponent";
import { Post, UserData } from "~/utils/types";
export default function Home() {
  const { session } = createEstate("main");
  const posts: [Post, UserData][] = [
    [
      {
        id: 1,
        user_id: "user1",
        content: "これはダミーの投稿です。",
        created_at: new Date().toISOString(),
        dependant: null,
      },
      {
        bio: null,
        created_at: null,
        id: "user1",
        name: "bob",
        profile_photo_url: "",
        username: "anonymous",
      },
    ],
    [
      {
        id: 2,
        user_id: "user2",
        content: "こちらもダミーの投稿です。",
        created_at: new Date().toISOString(),
        dependant: null,
      },
      {
        bio: null,
        created_at: null,
        id: "user2",
        name: "jhon",
        profile_photo_url: null,
        username: "anonymous2",
      },
    ],
  ];

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <For each={posts}>
        {([post, user], i) => (
          <div class="first:mt-0 mt-4 max-w-2xl">
            <PostComponent post_data={post} user_data={user} />
          </div>
        )}
      </For>
      <Show when={!!session()}>
        <button
          onClick={async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) throw error;
              // ログアウト後のリダイレクト
              window.location.href = "/";
            } catch (err) {
              console.error("ログアウトエラー:", err);
            }
          }}
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          ログアウト
        </button>
      </Show>
    </main>
  );
}
