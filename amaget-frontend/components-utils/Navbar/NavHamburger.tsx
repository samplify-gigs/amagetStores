import { GiHamburgerMenu } from "react-icons/gi";

type NavHamburgerProps = {
  open: boolean;
  setOpenAction: React.Dispatch<React.SetStateAction<boolean>>;
  size?: number;
};

export function NavHamburger({
  open,
  setOpenAction,
  size = 21,
}: NavHamburgerProps) {
  return (
    <button
      className="p-1.5 rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors text-secondary"
      onClick={() => {
        setOpenAction(!open);
      }}
    >
      <GiHamburgerMenu size={size} />
    </button>
  );
}
