import { FiLock, FiUser } from "react-icons/fi";

export default function AdminSettingsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-10 md:px-9 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[.18em] text-[#8a7655] uppercase">
          Workspace
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[#24231f]">
          Profile &amp; settings
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#77736c]">
          Your administrator profile and account access for Keazzy&apos;s Curations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-[#e4ded4] bg-white p-6">
          <FiUser className="text-xl text-[#8a7655]" />
          <h2 className="mt-4 font-medium">Administrator profile</h2>
          <p className="mt-2 text-sm leading-6 text-[#77736c]">
            Profile details are shown in the navigation sidebar. Contact your
            workspace owner to update your account information.
          </p>
        </article>
        <article className="rounded-xl border border-[#e4ded4] bg-white p-6">
          <FiLock className="text-xl text-[#8a7655]" />
          <h2 className="mt-4 font-medium">Account access</h2>
          <p className="mt-2 text-sm leading-6 text-[#77736c]">
            Your administrator access is protected by your account sign-in.
            Sign out from the bottom of the sidebar when you finish.
          </p>
        </article>
      </div>
    </section>
  );
}
