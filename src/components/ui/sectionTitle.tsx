type TProps = {
  children: string;
  className?: string;
};
export function SectionTitle({ children, className }: TProps) {
  return (
    <h2
      className={`border-b pb-2 text-sm font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}
