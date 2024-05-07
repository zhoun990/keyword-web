// src/routes/signup.tsx
import { createSignal } from "solid-js";

function Signup() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handle_email_change = (e: Event) =>
    setEmail((e.target as HTMLInputElement).value);
  const handle_password_change = (e: Event) =>
    setPassword((e.target as HTMLInputElement).value);
  const handle_confirm_password_change = (e: Event) =>
    setConfirmPassword((e.target as HTMLInputElement).value);

  const signup = async () => {
    if (password() !== confirmPassword()) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to email verification page
       window.location.href = "/emailVerification";
    }, 2000);
  };

  return (
    <div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
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
          type="password"
          id="confirmPassword"
          value={confirmPassword()}
          onInput={handle_confirm_password_change}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          onClick={signup}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
