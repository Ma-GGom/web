"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import { SettingsAuthModal } from "@/features/home/components/settings-auth-modal";
import { getAuthTokenFromCookie, getEmailFromAccessToken } from "@/shared/lib/storage";
import { Button } from "@/shared/ui/button";

// 쿠키 변경을 구독할 방법이 없어 화면 진입 시점의 값만 읽는다.
const subscribeNothing = () => () => {};

export function LandingHeader() {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // 쿠키는 브라우저에서만 읽을 수 있어, 서버 렌더링에서는 비워 두고 브라우저에서 로그인 이메일을 표시한다.
  const loggedInEmail = useSyncExternalStore(
    subscribeNothing,
    () => getEmailFromAccessToken(getAuthTokenFromCookie()),
    () => null,
  );

  const handleSettingsClick = () => {
    const cookieToken = getAuthTokenFromCookie();
    const tokenEmail = getEmailFromAccessToken(cookieToken);

    if (cookieToken && tokenEmail) {
      setEmail(tokenEmail);
      router.push("/settings");
      return;
    }

    if (cookieToken && !tokenEmail) {
      clearSession();
    }

    setIsAuthModalOpen(true);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-end gap-2 px-3 pt-4 sm:px-6 sm:pt-5">
        {loggedInEmail && (
          <span
            className="max-w-[180px] truncate rounded-lg border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-600 backdrop-blur sm:max-w-[260px] sm:text-sm"
            title={loggedInEmail}
          >
            {loggedInEmail}
          </span>
        )}
        <Button
          className="h-10 w-auto rounded-lg px-4 text-sm shadow-[0_8px_20px_rgba(99,102,241,0.28)]"
          type="button"
          onClick={handleSettingsClick}
        >
          설정
        </Button>
      </div>
      {isAuthModalOpen && (
        <SettingsAuthModal onClose={() => setIsAuthModalOpen(false)} onSuccess={() => router.push("/settings")} />
      )}
    </header>
  );
}
