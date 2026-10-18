// 백엔드 Member(name) 규칙과 맞춘다: 최대 20자, 공백 없이 완성형 한글만.
export const MAX_NAME_LENGTH = 20;
export const NAME_PATTERN = /^[가-힣]+$/;
export const NAME_FORMAT_MESSAGE = "이름은 공백 없이 한글로만 입력해 주세요.";
