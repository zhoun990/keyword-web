import { Post, UserData } from "~/utils/types";

export const PostComponent = ({
  post_data,
  user_data,
}: {
  post_data: Post;
  user_data: UserData;
}) => {
  return (
    <div class="bg-gray-800 shadow rounded-lg p-6">
      <div>
        {user_data.profile_photo_url ? (
          <img
            src={user_data.profile_photo_url}
            alt=""
            class="w-[60px] h-[60px] bg-slate-600 rounded-full p-1"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width={1.5}
            stroke="currentColor"
            class="w-[60px] h-[60px] bg-slate-600 rounded-full p-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        )}
        <div class="flex flex-col">
          <a class="text-xl font-bold text-white mb-2">{user_data.username}</a>
          <a class="text-xl font-bold text-white mb-2">{user_data.name}</a>
        </div>
      </div>
      <p class="text-gray-300">{post_data.content}</p>
      <div class="flex justify-between items-center text-gray-400 text-sm mt-4">
        <span>{post_data.created_at?.toString()}</span>
        <span>リツイート: 0 | いいね: 0</span>
      </div>
    </div>
  );
};
