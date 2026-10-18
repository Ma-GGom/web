export interface SubscriptionSettings {
  receive_days: string;
  receive_time: string;
  pref_regions: string[];
  pref_distances: string[];
  include_small: boolean;
  // 비어 있으면 이름을 등록하지 않은 상태. 빈 문자열로 저장하면 기존 이름이 지워진다.
  name: string;
}

export interface SubscriptionResponse extends Omit<SubscriptionSettings, "name"> {
  name?: string | null;
}

export type SubscriptionUpdatePayload = Partial<SubscriptionSettings>;
