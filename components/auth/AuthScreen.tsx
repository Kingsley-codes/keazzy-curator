"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  FiBell,
  FiBookmark,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMessageCircle,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa6";
import { requestJson } from "@/lib/backend";
import { images } from "@/lib/editorial-data";

type Mode = "login" | "signup";

export function AuthScreen({ mode }: { mode: Mode }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    setMessage(null);

    if (signup && password !== data.get("confirmPassword")) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (signup && !data.get("terms")) {
      setMessage({ type: "error", text: "Please accept the Terms of Service and Privacy Policy." });
      return;
    }

    setPending(true);
    try {
      if (signup) {
        const names = String(data.get("name") ?? "").trim().split(/\s+/);
        await requestJson("/api/auth/users/register", {
          method: "POST",
          body: JSON.stringify({
            firstName: names[0],
            lastName: names.slice(1).join(" ") || names[0],
            email: data.get("email"),
            phoneNumber: data.get("phoneNumber"),
            course: "frontend",
            password,
          }),
        });
        setMessage({ type: "success", text: "Account created. You can now sign in." });
        window.setTimeout(() => router.push("/login"), 700);
      } else {
        const response = await requestJson<{ data?: { user?: unknown } }>(
          "/api/auth/users/login",
          {
            method: "POST",
            body: JSON.stringify({
              email: data.get("email"),
              password,
              rememberMe: Boolean(data.get("rememberMe")),
            }),
          },
        );
        if (response.data?.user) localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/posts");
        router.refresh();
      }
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Something went wrong." });
    } finally {
      setPending(false);
    }
  }

  const benefits = signup
    ? [
        [FiMessageCircle, "Join the conversation"],
        [FiBookmark, "Save your favorite articles"],
        [FiBell, "Get personalized recommendations"],
        [FiUsers, "Be part of a growing community"],
      ]
    : [
        [FiBookmark, "Read and save your favorite articles"],
        [FiMessageCircle, "Join the conversation"],
        [FiBookmark, "Get personalized content"],
        [FiBell, "Be the first to know"],
      ];

  return (
    <main className="grid min-h-[790px] bg-white min-[900px]:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-cover bg-center px-[8vw] pt-[85px] pb-[55px] text-white min-[900px]:flex" style={{ backgroundImage: `linear-gradient(90deg,rgba(10,9,7,.93),rgba(10,9,7,.5)),url(${images.hero})` }}>
        <div className="max-w-[560px]">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a66d25]">{signup ? "Join Keazzy’s Curations" : "Welcome back"}</p>
          <h1 className="mt-3 max-w-[520px] font-serif text-[clamp(48px,5vw,68px)] leading-[.96] font-semibold">{signup ? "Be Part of a Smarter, More Informed Community." : "Great stories are waiting for you."}</h1>
          <span className="my-[18px] block h-px w-[38px] bg-[#c89b55]" />
          <p className="max-w-[440px] text-[15px] leading-[1.65] text-[#eee]">{signup ? "Create an account to comment, save your favorite articles, and get personalized content from Keazzy’s Curations." : "Log in to continue reading, commenting and exploring the latest from Keazzy’s Curations."}</p>
          <ul className="mt-[30px] grid gap-[15px]">{benefits.map(([Icon, text]) => <li key={text as string} className="flex items-center gap-4 text-[13px]"><span className="grid size-[38px] place-items-center rounded-full border border-[#d2a153] text-[17px] text-[#e7b65f]"><Icon /></span>{text as string}</li>)}</ul>
        </div>
        <p className="mt-[45px] font-serif text-[23px] leading-[1.45] italic">Thoughtful stories.<br />Fresh perspectives.<br />A more informed you.</p>
      </section>

      <section className="flex items-center justify-center bg-[radial-gradient(circle_at_100%_0,#f5f0e7_0,transparent_34%)] bg-[#fdfcf9] px-[22px] py-[55px] min-[900px]:px-[7vw]">
        <form onSubmit={submit} className="w-full max-w-[500px]">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a66d25]">{signup ? "Create an account" : "Welcome back"}</p>
          <h2 className="mt-1 font-serif text-[clamp(48px,5vw,64px)] leading-none font-semibold">{signup ? "Sign Up" : "Log In"}</h2>
          <p className="mt-2 mb-[25px] text-[15px]">{signup ? "Join Keazzy’s Curations and be part of a community that values great stories." : "Access your Keazzy’s Curations account."}</p>

          {signup && <Field icon={<FiUser />} label="Full Name" name="name" placeholder="Enter your full name" autoComplete="name" />}
          <Field icon={<FiMail />} label="Email Address" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          {signup && <Field icon={<FiUser />} label="Phone Number" name="phoneNumber" type="tel" placeholder="Enter your phone number" autoComplete="tel" />}
          <Field icon={<FiLock />} label="Password" name="password" type={showPassword ? "text" : "password"} placeholder={signup ? "Create a password" : "Enter your password"} autoComplete={signup ? "new-password" : "current-password"} action={<button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <FiEyeOff /> : <FiEye />}</button>} />
          {signup && <><p className="mt-[5px] text-[10px] text-[#777]">Use at least 8 characters with uppercase, number and symbol.</p><Field icon={<FiLock />} label="Confirm Password" name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirm your password" autoComplete="new-password" /></>}

          <div className="my-[17px] flex items-start justify-between gap-[14px] text-[11px]">
            <label className="flex items-start gap-2"><input className="mt-px accent-[#a66d25]" type="checkbox" name={signup ? "terms" : "rememberMe"} /> <span>{signup ? <>I agree to the <a href="#" className="text-[#9a621d]">Terms of Service</a> and <a href="#" className="text-[#9a621d]">Privacy Policy</a></> : "Keep me signed in"}</span></label>
            {!signup && <span className="cursor-help whitespace-nowrap text-[#9a621d]" title="Password reset is not yet available in the backend">Forgot password?</span>}
          </div>

          {message && <p role="alert" className={`mb-3 rounded px-3 py-2.5 text-[11px] ${message.type === "error" ? "bg-[#fff0ed] text-[#a12e1b]" : "bg-[#ebf7ed] text-[#256c35]"}`}>{message.text}</p>}
          <button className="flex min-h-[45px] w-full items-center justify-center rounded bg-linear-to-r from-[#b77e30] via-[#cc9c55] to-[#b77e30] text-[13px] text-white transition hover:-translate-y-px hover:brightness-95 disabled:cursor-wait disabled:opacity-65" disabled={pending}>{pending ? "Please wait…" : signup ? "Create Account  →" : "Log In  →"}</button>

          <div className="mt-[21px] mb-[13px] flex items-center gap-[14px] text-[9px] uppercase tracking-[.2em] text-[#666] before:h-px before:flex-1 before:bg-[#d7d4ce] after:h-px after:flex-1 after:bg-[#d7d4ce]"><span>or {signup ? "sign up" : "continue"} with</span></div>
          <SocialButton><FcGoogle />Continue with Google</SocialButton>
          <SocialButton><FaFacebook className="text-[#1877f2]" />Continue with Facebook</SocialButton>
          <SocialButton><FaApple />Continue with Apple</SocialButton>
          <p className="mt-[25px] text-center text-xs">{signup ? "Already have an account?" : "Don’t have an account?"} <Link className="text-[#9a621d]" href={signup ? "/login" : "/signup"}>{signup ? "Sign In" : "Sign Up"}</Link></p>
        </form>
      </section>
    </main>
  );
}

function Field({ label, icon, action, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: React.ReactNode; action?: React.ReactNode }) {
  return <label className="mt-[15px] block"><span className="mb-[7px] block text-xs font-medium">{label}</span><span className="flex h-12 items-center gap-3 rounded border border-[#cbc9c5] bg-white/55 px-[14px] text-[#222] focus-within:border-[#a8742e] focus-within:ring-3 focus-within:ring-[#c89b55]/12">{icon}<input required className="min-w-0 flex-1 bg-transparent text-[13px] outline-none" {...props} />{action && <span className="[&_button]:p-[7px]">{action}</span>}</span></label>;
}

function SocialButton({ children }: { children: React.ReactNode }) {
  return <button type="button" className="mt-2.5 flex h-[45px] w-full cursor-not-allowed items-center justify-center gap-[15px] rounded border border-[#d5d3ce] bg-white/55 text-xs opacity-75 [&_svg]:text-xl" disabled title="Social sign-in requires backend OAuth configuration">{children}</button>;
}
