import { Component, Show } from "solid-js";

import { Atom, atom } from "solid-use";

import { createSupabase, createSupabaseAuth } from "../supabase";
import { useNavigate } from "@solidjs/router";

const Register: Component = () => {

  // const togglesignupByMail = atom(false);

  return (
    <div class="flex max-w-1000px w-auto h-auto pt-120px mx-auto align-items-center">
      <div class="w-384px">
        <div class="font-mono prose text-2.6rem lh-3rem font-bold">
          <div class="i-fluent:rocket-24-filled text-3rem mr-10px" />
          Register
        </div>
        <div class="italic pt-6px">Welcome to TESTING</div>
        <div class="flex flex-col mt-42px w-384px gap-32px">
          <SignupWithEmail />
          {/* <div class="flex align-items-center">
            <div class="h-1px grow-1 w-auto bg-text/80"></div>
            <div class="px-28px">or</div>
            <div class="h-1px grow-1 w-auto bg-text/80"></div>
          </div>
          <Show when={!togglesignupByMail()}>
            <SignupWithGoogle />
            <SignupWithGithub />
          </Show> */}
        </div>
      </div>
      <div class="flex-grow"></div>
      <div class="max-w-520px max-h-520px">

      </div>
    </div>
  );
};

const SignupWithEmail: Component = (props) => {
  const navigate = useNavigate();
  const auth = createSupabaseAuth();
  const password = atom("");
  const email = atom("");

  const signupWithEmailPassword = async(e: Event) => {
    e.preventDefault();

    const { data, error } = await auth.signUp({
        email: email(),
        password: password(),
    })

    if (error) {
      alert(error.message)
    }
    if (data.user) {
      alert("Check your email for the confirmation link!");
      navigate("/login");
    }


  }

  return (
      <form onSubmit={signupWithEmailPassword} class="flex flex-col gap-28px mt-2px">
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
          Sign Up
        </button>
      </form>
  );
};

const SignupWithGoogle: Component = () => {
  const auth = createSupabaseAuth();

  async function signupWithGoogle() {
    const { data, error } = await auth.signInWithOAuth({
      provider: "google",
    });

    if (!data) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={signupWithGoogle}
      class="fw-600 px-32px py-12px border-radius-4px bg-surface0 hover:bg-surface0/80"
    >
      <div class="i-ant-design:google-circle-filled text-1.2rem -translate-y-2px mr-6px" />
      Continue with Google.
    </button>
  );
};

const SignupWithGithub: Component = () => {
  const auth = createSupabaseAuth();

  async function signupWithGithub() {
    const {data, error} = await auth.signInWithOAuth({
      provider: "github",
    });


    if (!data) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={signupWithGithub}
      class="fw-600 px-32px py-12px border-radius-4px bg-surface0 hover:bg-surface0/80"
    >
      <div class="i-ant-design:github-filled text-1.2rem -translate-y-2px mr-6px" />
      Continue with Github.
    </button>
  );
};

export default Register;
