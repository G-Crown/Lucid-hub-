type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

export default function AdminButton({
  children,
  type = "button",
  onClick,
  variant = "primary",
  disabled,
}: Props) {

  const styles = {
    primary:
      "bg-[#1A1AFF] hover:bg-blue-700 text-white",

    secondary:
      "bg-white/10 hover:bg-white/20 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-5 py-3 rounded-lg transition font-medium ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
