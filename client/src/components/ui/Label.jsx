export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-base block my-1 text-slate-300">
      {children}
    </label>
  );
}