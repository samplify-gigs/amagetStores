import { FaUser } from "react-icons/fa";

type Userprops = {
  size?: number;
  className?: string;
};

export function UserIcon({
  size = 18,
  className = "p-2 rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors text-secondary",
}: Userprops) {
  return (
    <>
      <button className={className}>{<FaUser size={size} />}</button>
    </>
  );
}
