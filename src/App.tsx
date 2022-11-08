import { Component, createContext, createEffect, createSignal, JSXElement, Show, useContext } from "solid-js";
import { Routes, Route, Outlet } from "@solidjs/router"
import { AuthSession, createClient, SupabaseClient, User } from '@supabase/supabase-js'
import { createOnAuthStateChange, createSupabase, createSupabaseAuth, SupabaseProvider } from "./supabase";
import { Atom, atom } from "solid-use";
import Landing from "./pages/landing";

import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";


const App: Component = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)


  return (
    <SupabaseProvider client={supabase}>

      <ProfileProvider>
        <Routes>
          <Route path="/" component={Main}>
            <Route path="/" element={<Landing />} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Route>
        </Routes>
        </ProfileProvider>

    </SupabaseProvider>

  );
}

type Profile = {
  id: string;
  fullname: string;
  avatar_url: string;
  username: string;
  organization: string;
  bio: string;
  website: string;
  email: string;
  phone: string
}

const ProfileContext = createContext<{profile: Atom<Profile>, user: Atom<User>, fetch: () => void}>();

export function ProfileProvider(props) {
  const supabase = createSupabase()
  const auth = createSupabaseAuth()

  const profile = atom<Profile>(null)
  const user = atom<User>(null)


  const fetch = async () => {
      await auth.getUser().then(({ data }) => { user(data.user) })
      await supabase.from("profiles").select("*").eq("id", user().id).single().then((data) => { profile(data.data) })
  }

  createOnAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      fetch()
    }
  })



  return (
      <ProfileContext.Provider value={{profile, user, fetch }}>
          {props.children}
      </ProfileContext.Provider>
  )
}

export const useProfile = () => { return useContext(ProfileContext); }


const Main = () => {

  return (
    <div class="overflow-x-clip">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}


export default App
