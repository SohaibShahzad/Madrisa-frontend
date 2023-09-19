import { useRouter, usePathname } from "next/navigation";

function ActiveLink({ href, styles, children, onClick, ...props }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeStyles = isActive
    ? "flex items-center gap-3 pl-4 py-3 bg-[#1f8693] rounded-lg m-2"
    : styles;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
    if (onClick) onClick(e);
  };

  return (
    <a href={href} {...props} onClick={handleClick} className={activeStyles}>
      {children}
    </a>
  );
}

export default ActiveLink;
