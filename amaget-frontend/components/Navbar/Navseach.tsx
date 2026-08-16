type NavSearchInputProps = {
  placeholder?: string;
  value?:string;
  className?: string;
  onChange: (value: string) => void;
};

export function NavSearch({
  placeholder = "Search for products...",
  value="",
  className = "w-full bg-gray-100 text-black text-sm placeholder-gray-400  pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 shadow-inner transition-all  ",
  onChange,
}: NavSearchInputProps) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}