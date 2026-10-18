"use client";

import { useCallback, useState } from "react";
import { settingsApi } from "@/features/settings/api";
import type { SubscriptionUpdatePayload } from "@/features/settings/types";

interface LoadMySubscriptionOptions {
  silent?: boolean;
}

export function useSettingsActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadMySubscription = useCallback(async (options?: LoadMySubscriptionOptions) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      return await settingsApi.getMySubscription();
    } catch (caughtError) {
      if (!options?.silent) {
        setError(caughtError instanceof Error ? caughtError.message : "구독 정보를 불러오지 못했습니다.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSubscription = useCallback(async (payload: SubscriptionUpdatePayload) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      await settingsApi.updateSubscription(payload);
      setMessage("저장되었습니다.");
      return true;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "구독 설정 변경에 실패했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSubscription = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      await settingsApi.deleteSubscription();
      setMessage("구독이 해지되었습니다.");
      return true;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "구독 해지에 실패했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    message,
    loadMySubscription,
    updateSubscription,
    deleteSubscription,
  };
}
