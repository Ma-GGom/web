import type { Metadata } from "next";
import { SettingsForm } from "@/features/settings/components/settings-form";
import { SettingsHeader } from "@/features/settings/components/settings-header";
import { AppFooter } from "@/shared/ui/footer";

export const metadata: Metadata = {
  title: "설정",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function SettingsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-3 pb-2 pt-2 sm:px-5 sm:pt-3 lg:px-6">
      <section className="flex-1 px-4 pb-2 pt-4 sm:px-5 sm:pb-3 sm:pt-5">
        <SettingsHeader />
        <SettingsForm />
      </section>
      <AppFooter />
    </main>
  );
}
