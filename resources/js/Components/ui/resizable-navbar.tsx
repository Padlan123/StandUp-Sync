"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <div className={cn("fixed inset-x-0 top-6 z-50 w-full", className)}>
      {children}
    </div>
  );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <div
      style={{
        minWidth: "760px",
        width: "55%",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden flex-row items-center justify-between px-6 lg:px-8 lg:flex bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-full py-2.5 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 transition-colors rounded-full font-semibold tracking-tight text-slate-600 hover:text-slate-950"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full -z-10 bg-slate-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <div
      style={{ width: "92%" }}
      className={cn(
        "relative z-50 mx-auto flex flex-col items-center justify-between py-2.5 px-6 lg:hidden bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-full dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-6 rounded-2xl bg-[#0F172A] border border-slate-800 px-6 py-8 shadow-2xl dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="cursor-pointer text-slate-900 dark:text-white" onClick={onClick} size={24} />
  ) : (
    <IconMenu2 className="cursor-pointer text-slate-900 dark:text-white" onClick={onClick} size={24} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2.5 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/img/logo/logo-main.svg"
        alt="Briefly"
        className="w-6 h-6 transition-transform hover:scale-105 duration-200"
      />
      <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
        Briefly
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-5 py-2 rounded-lg text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition duration-200 inline-block text-center tracking-tight";

  const variantStyles = {
    primary:
      "bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 border border-[#10B981]/50",
    secondary: "bg-transparent shadow-none text-slate-600 hover:text-slate-950",
    dark: "bg-slate-900 text-white shadow-md hover:bg-slate-800",
    gradient:
      "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-md",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
