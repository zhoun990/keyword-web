import { createEffect, createSignal } from "solid-js";
import { createEstate } from "~/utils/estate";
import { supabase } from "~/utils/supabase";
import { redirect, useNavigate } from "@solidjs/router";

export default function Signup() {
  const { session } = createEstate("main");

  const navigate = useNavigate();

  createEffect(() => {
    const current_session = session();
    if (current_session) {
      navigate("/", { replace: true });
    }
  });

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleSignup = async (e: Event) => {
    e.preventDefault();
    try {
      if (password() !== confirmPassword()) {
        setError("Passwords do not match.");
        return;
      }
      setLoading(true);
      const { error, data: user } = await supabase.auth.signUp({
        email: email(),
        password: password(),
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.error_description || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handle_email_change = (e: Event) =>
    setEmail((e.target as HTMLInputElement).value);
  const handle_password_change = (e: Event) =>
    setPassword((e.target as HTMLInputElement).value);
  const handle_confirm_password_change = (e: Event) =>
    setConfirmPassword((e.target as HTMLInputElement).value);

  return (
    <div class="p-4 max-w-md mx-auto">
      <form onSubmit={handleSignup}>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            value={email()}
            onInput={handle_email_change}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            value={password()}
            onInput={handle_password_change}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            required
            type="password"
            id="confirmPassword"
            value={confirmPassword()}
            onInput={handle_confirm_password_change}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading()}
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            {loading() ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        {error() && <p class="mt-2 text-sm text-red-600">{error()}</p>}
      </form>
    </div>
  );
}
