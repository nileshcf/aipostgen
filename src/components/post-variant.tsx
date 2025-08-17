export default function PostVariant({ text }: { text: string }) {
  return (
    <div className="rounded-md border px-4 py-3 bg-white/50">
      <pre className="whitespace-pre-wrap text-sm leading-6">{text}</pre>
    </div>
  );
}
