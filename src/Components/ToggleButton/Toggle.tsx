import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteTimeTheme } from "../../context/SiteThemeContext";
import { useSiteTheme } from "../../context/SiteThemeContext";
import { Flower } from "./ButtonSVGs/Flower";
import { Leaf } from "./ButtonSVGs/Leaf";
import { Moon } from "./ButtonSVGs/Moon";
import { Texture } from "./ButtonSVGs/Texture";
import "./Toggle.scss";

const OPTION_H = 68;
const NUM_OPTS = 3;
const OPTIONS_HEIGHT = OPTION_H * NUM_OPTS;

const MODE_ORDER: { mode: "moon" | "flower" | "leaf"; theme: SiteTimeTheme; label: string }[] = [
    { mode: "moon", theme: "night", label: "Night mode" },
    { mode: "flower", theme: "morning", label: "Morning mode" },
    { mode: "leaf", theme: "afternoon", label: "Afternoon mode" },
];

function useMediaQuery(query: string) {
    return useSyncExternalStore(
        (onChange) => {
            const mq = window.matchMedia(query);
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        },
        () => window.matchMedia(query).matches,
        () => false,
    );
}

function TriggerIcon({ theme }: { theme: SiteTimeTheme }) {
    if (theme === "night") {
        return <Moon />;
    }
    if (theme === "morning") {
        return <Flower />;
    }
    return <Leaf />;
}

const SUPPRESS_MS = 480;

export const Toggle = () => {
    const { theme, setTheme } = useSiteTheme();
    const pillRef = useRef<HTMLDivElement | null>(null);
    const suppressHoverOpenRef = useRef(false);
    const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [suppressPointer, setSuppressPointer] = useState(false);
    const noHover = useMediaQuery("(hover: none)");
    const reduceMotion = useReducedMotion();
    const [iconPickCount, setIconPickCount] = useState(0);
    const textureFilterId = useId().replace(/:/g, "");
    const textureViewHeight = 68 + (isOpen ? OPTIONS_HEIGHT : 0);

    const clearSuppressTimer = useCallback(() => {
        if (suppressTimerRef.current) {
            clearTimeout(suppressTimerRef.current);
            suppressTimerRef.current = null;
        }
    }, []);

    useEffect(() => () => clearSuppressTimer(), [clearSuppressTimer]);

    const openToggle = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeToggle = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (!noHover || !isOpen) return;
        const onDocPointerDown = (e: PointerEvent) => {
            if (pillRef.current?.contains(e.target as Node)) return;
            setIsOpen(false);
        };
        document.addEventListener("pointerdown", onDocPointerDown, true);
        return () => document.removeEventListener("pointerdown", onDocPointerDown, true);
    }, [noHover, isOpen]);

    const onTriggerEnter = () => {
        if (suppressHoverOpenRef.current || noHover || isOpen) return;
        openToggle();
    };

    const onPillLeave = () => {
        if (isOpen) {
            closeToggle();
        }
    };

    const onTriggerClick = () => {
        if (noHover) {
            setIsOpen((o) => !o);
        }
    };

    const onPick = (next: SiteTimeTheme) => {
        setTheme(next);
        setIconPickCount((c) => c + 1);
        closeToggle();
        /* Hover desktops: pointer stays over the pill — block reopen + ignore events until close finishes */
        if (noHover) return;
        suppressHoverOpenRef.current = true;
        setSuppressPointer(true);
        clearSuppressTimer();
        suppressTimerRef.current = setTimeout(() => {
            suppressHoverOpenRef.current = false;
            setSuppressPointer(false);
            suppressTimerRef.current = null;
        }, SUPPRESS_MS);
    };

    const springOpen = reduceMotion
        ? { duration: 0.15 }
        : { type: "spring" as const, stiffness: 220, damping: 16, mass: 0.9 };

    /** Softer shutdown than a hard snap — closer to GSAP power3.inOut on height */
    const heightClose = reduceMotion
        ? { duration: 0.12 }
        : { duration: 0.42, delay: 0.06, ease: [0.45, 0, 0.55, 1] as const };

    return (
        <div className="theme-toggle">
            <div
                ref={pillRef}
                className={`toggle-pill${suppressPointer ? " is-suppressing-pointer" : ""}`}
                onMouseLeave={onPillLeave}
            >
                <div className="toggle-pill__texture" aria-hidden>
                    <Texture filterId={textureFilterId} viewBoxHeight={textureViewHeight} />
                </div>
                <button
                    type="button"
                    className="toggle-trigger"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-label={`Theme: ${MODE_ORDER.find((o) => o.theme === theme)?.label ?? "current"}. Hover or tap to choose.`}
                    onMouseEnter={onTriggerEnter}
                    onClick={onTriggerClick}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            if (noHover) {
                                setIsOpen((o) => !o);
                            } else if (!isOpen) {
                                openToggle();
                            }
                        }
                        if (e.key === "Escape" && isOpen) {
                            e.preventDefault();
                            closeToggle();
                        }
                    }}
                >
                    <motion.div
                        className="nori-ring"
                        animate={{ scale: isOpen ? 0.9 : 1 }}
                        transition={
                            reduceMotion
                                ? { duration: 0 }
                                : isOpen
                                    ? { duration: 0.2 }
                                    : { duration: 0.28, ease: [0.33, 1.4, 0.68, 1] }
                        }
                    >
                        <motion.span
                            key={theme}
                            initial={
                                reduceMotion || iconPickCount === 0
                                    ? false
                                    : { scale: 0.5, opacity: 0, rotate: -20 }
                            }
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={
                                reduceMotion
                                    ? { duration: 0 }
                                    : { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }
                            }
                            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <TriggerIcon theme={theme} />
                        </motion.span>
                    </motion.div>
                </button>

                <motion.div
                    className="options-container"
                    initial={false}
                    animate={{ height: isOpen ? OPTIONS_HEIGHT : 0 }}
                    transition={isOpen ? springOpen : heightClose}
                >
                    {MODE_ORDER.map(({ mode, theme: t, label }, i) => (
                        <motion.button
                            key={mode}
                            type="button"
                            className={`mode-option${theme === t ? " is-selected" : ""}`}
                            data-mode={mode}
                            aria-label={label}
                            aria-current={theme === t ? "true" : undefined}
                            onClick={(e) => {
                                e.stopPropagation();
                                onPick(t);
                            }}
                            initial={false}
                            animate={
                                reduceMotion
                                    ? { opacity: isOpen ? 1 : 0, y: 0 }
                                    : isOpen
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: -8 }
                            }
                            transition={
                                reduceMotion
                                    ? { duration: 0.1 }
                                    : isOpen
                                        ? {
                                            opacity: { duration: 0.35, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
                                            y: { duration: 0.35, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
                                        }
                                        : {
                                            opacity: {
                                                duration: 0.24,
                                                delay: i * 0.04,
                                                ease: [0.4, 0, 0.2, 1],
                                            },
                                            y: {
                                                duration: 0.24,
                                                delay: i * 0.04,
                                                ease: [0.4, 0, 0.2, 1],
                                            },
                                        }
                            }
                        >
                            <span className="option-bg" aria-hidden />
                            {mode === "moon" && <Moon />}
                            {mode === "flower" && <Flower />}
                            {mode === "leaf" && <Leaf />}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
