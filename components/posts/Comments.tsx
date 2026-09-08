const comments = [
  { initials: "TA", name: "Tunde A.", text: "Really informative! I’ve been looking for a new laptop and this article helped a lot.", likes: 5 },
  { initials: "CS", name: "Chison K.", text: "Great breakdown. The AI assistant section was my favorite.", likes: 3 },
];

export function Comments() {
  return <section className="mt-8"><div className="flex items-end justify-between border-b border-[#ded9d0] pb-2"><h2 className="font-serif text-xl font-medium">Comments (12)</h2><button className="text-[9px] text-[#9a6e32]">Sign in to join the conversation</button></div>{comments.map((comment) => <article key={comment.name} className="flex gap-3 border-b border-[#ded9d0] py-4"><div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d4c6b3] text-[9px] font-semibold">{comment.initials}</div><div><div className="flex items-center gap-3"><strong className="text-xs">{comment.name}</strong><time className="text-[9px] text-[#77736c]">Sep 4, 2026</time></div><p className="mt-1 text-[11px] leading-relaxed">{comment.text}</p><div className="mt-2 flex gap-4 text-[9px] text-[#77736c]"><button>Reply</button><span>♡ {comment.likes}</span></div></div></article>)}</section>;
}
