"use client";

import { signIn } from "next-auth/react";

const SignIn = () => {
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error("Error:", result.error);
    } else {
      console.log("Signed in successfully");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn("google")}>Sign In with Google</button>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
