"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Code2, Menu, X } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Code2 className="h-6 w-6" />
          <span>Kalgo4444</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex absolute md:right-1/2 md:translate-x-1/2 items-center gap-6 text-sm font-bold">
          <Link href="#hero" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#skills" className="hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="#projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="https://github.com/kalgo4444" target="_blank">
              GitHub
            </Link>
          </Button>
          <Button asChild>
            <Link href="mailto:abuxyziabd@gmail.com">Hire Me</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden border-t bg-background overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="#hero"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="#skills"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Projects
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <div className="flex justify-end mb-2">
                  <ModeToggle />
                </div>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="https://github.com/kalgo4444" target="_blank">
                    GitHub
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start">
                  <Link href="mailto:abuxyziabd@gmail.com">Hire Me</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
