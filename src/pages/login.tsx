import { Component } from "solid-js";


import { atom } from "solid-use";
import { createSupabaseAuth } from "../supabase";
import { useNavigate } from "@solidjs/router"

const Login: Component = () => {


  return (
    <div class="flex max-w-1000px w-auto h-auto pt-120px mx-auto align-items-center">
      <div class="w-384px">
        <div class="font-mono prose text-2.6rem lh-3rem font-bold">
          <div class="i-ic:baseline-door-sliding -translate-y-4px text-3rem mr-10px" />
          Login
        </div>
        <div class="italic pt-2px">Welcome back!</div>
        <div class="flex flex-col mt-42px w-384px gap-32px">
          <SigninWithEmailPassword />
          {/* <div class="flex align-items-center">
                        <div class="h-1px grow-1 w-auto bg-text/80"></div>
                        <div class="px-28px">or</div>
                        <div class="h-1px grow-1 w-auto bg-text/80"></div>
                    </div> */}
          {/* <div class="flex w-full justify-between">
                        <SigninWithGoogle />
                        <SigninWithGithub />
                    </div> */}
        </div>
      </div>
      <div class="flex-grow"></div>
      <div class="max-w-520px max-h-520px">

      </div>
    </div>
  );
};

const SigninWithEmailPassword: Component = () => {
  const navigate = useNavigate();
  const auth = createSupabaseAuth();
  const password = atom("");
  const email = atom("");

  async function signinWithEmailPassword(e: Event) {
    e.preventDefault();
    const { data, error } = await auth.signInWithPassword({
      email: email(),
      password: password(),
    });

    if (error) {
      alert(error.message);
    }
    console.log(data.user)
    if (data.user) {
      navigate("/dashboard/profile");
    }
  }

  return (
    <form onSubmit={signinWithEmailPassword} class="flex flex-col gap-28px mt-2px">
      <input
        type="email"
        placeholder="Email"
        value={email()}
        onChange={(e) => email(e.currentTarget.value)}
        class="h-52px mlight:bg-white/60 dark:bg-white/0 grow-1 border-1px hover:border-mauve/80 focus:border-mauve/80 focus:ring-0 border-surface2 border-radius-4px placeholder:color-text/60"
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onChange={(e) => password(e.currentTarget.value)}
        class="h-52px light:bg-white/60 dark:bg-white/0 grow-1 border-1px hover:border-mauve/80 focus:border-mauve/80 focus:ring-0 border-surface2 border-radius-4px placeholder:color-text/60"
      />
      <button class="fw-600 px-32px py-12px border-radius-4px bg-mauve hover:bg-mauve/80 color-white dark:color-black">
        Log In
      </button>
    </form>
  );
};

export default Login;
