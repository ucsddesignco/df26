import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
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
const TRIGGER_H = OPTION_H;

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

/** After a theme pick, ignore trigger hover briefly so layout/pointer doesn’t immediately re-open (matches intent of HTML click → close while cursor stays put). */
const HOVER_OPEN_COOLDOWN_MS = 420;

export const Toggle = () => {
    const { theme, setTheme } = useSiteTheme();
    const pillRef = useRef<HTMLDivElement | null>(null);
    const lastPickAtRef = useRef(0);
    const [isOpen, setIsOpen] = useState(false);
    const [pillHeightPx, setPillHeightPx] = useState(TRIGGER_H);
    const textureFilterId = `toggle-tex-${useId().replace(/:/g, "")}`;
    const noHover = useMediaQuery("(hover: none)");
    const reduceMotion = useReducedMotion();
    const [iconPickCount, setIconPickCount] = useState(0);

    useLayoutEffect(() => {
        const el = pillRef.current;
        if (!el) return;
        const measure = () => {
            const h = el.getBoundingClientRect().height;
            if (h > 0) setPillHeightPx(Math.max(TRIGGER_H, Math.round(h * 1000) / 1000));
        };
        measure();
        const ro = new ResizeObserver(() => measure());
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

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
        if (noHover || isOpen) return;
        if (performance.now() - lastPickAtRef.current < HOVER_OPEN_COOLDOWN_MS) return;
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
        lastPickAtRef.current = performance.now();
        setTheme(next);
        setIconPickCount((c) => c + 1);
        closeToggle();
    };

    // sushi_theme_toggle_v2.html: open container elastic ~0.45s; close height 0.32s delay 0.08 power3.inOut
    const springOpen = reduceMotion
        ? { duration: 0.15 }
        : { type: "spring" as const, stiffness: 200, damping: 14, mass: 0.9 };

    const heightClose = reduceMotion
        ? { duration: 0.12 }
        : { duration: 0.34, delay: 0, ease: [0.65, 0, 0.35, 1] as const };

    return (
        <div className="theme-toggle">
            <div
                ref={pillRef}
                className="toggle-pill"
                onMouseLeave={onPillLeave}
            >
                {!reduceMotion && (
                    <Texture
                        className="toggle-pill-texture"
                        filterId={textureFilterId}
                        viewBoxHeight={Math.max(TRIGGER_H, pillHeightPx)}
                    />
                )}
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
                                    : { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }
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
                                                duration: 0.18,
                                                delay: i * 0.03,
                                                ease: [0.55, 0.085, 0.68, 0.53],
                                            },
                                            y: {
                                                duration: 0.18,
                                                delay: i * 0.03,
                                                ease: [0.55, 0.085, 0.68, 0.53],
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
