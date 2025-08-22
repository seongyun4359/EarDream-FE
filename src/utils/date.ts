export const timeAgo = (dateString: string) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffHours > 0) return `${diffHours}시간 전`;
  if (diffMinutes > 0) return `${diffMinutes}분 전`;
  return "방금 전";
};
