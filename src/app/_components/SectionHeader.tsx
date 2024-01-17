export function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="font-semibold leading-none tracking-tight uppercase pb-8 text-primary text-sm">
      {label}
    </h2>
  );
}
