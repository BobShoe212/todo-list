import React from "react";
import "./App.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import TodoList from "./components/TodoList";

// Get the Publishable Key from the environment
const clerk_pub_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

function App() {
  return (
    // Wrap your entire app with ClerkProvider
    // Don't forget to pass the frontendApi prop
    <ClerkProvider publishableKey={clerk_pub_key}>
      <SignedIn>
        <TodoList />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
