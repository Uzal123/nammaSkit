import React from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";

interface NavlinkProps extends LinkProps {
  exact?: boolean;
  children: React.ReactNode;
  className?: string;
  href: string;
}

const Navlink: React.FC<NavlinkProps> = ({
  href,
  exact,
  children,
  className = "",
  ...props
}) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    className += " active";
  } else {
    className += " inactive";
  }

  return (
    <Link
      href={href}
      {...props}
      className={`flex items-center gap-2 rounded-md px-3 py-2 w-full text-sm font-medium ${className}`}
    >
      {children}
    </Link>
  );
};

export default Navlink;
