export function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="font-semibold leading-none tracking-tight uppercase pb-6 text-slate-600 text-xs">
      {label}
    </h2>
  );
}
