import { useThemeDispatch } from "@/hooks/useThemeDispatch";
import { Switch } from "antd";
import { useRef } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";

function ThemeSwitch() {
  const { toggleTheme, isDark } = useThemeDispatch();
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleThemeChange = (
    checked: boolean,
    event:
      | ReactMouseEvent<HTMLButtonElement>
      | ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    const switchEl = switchRef.current;
    const rect = switchEl?.getBoundingClientRect();
    const x = rect
      ? rect.left + rect.width / 2
      : (event as ReactMouseEvent).clientX;
    const y = rect
      ? rect.top + rect.height / 2
      : (event as ReactMouseEvent).clientY;

    const endRadius =
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      ) * 1.2;

    if (!document.startViewTransition) {
      toggleTheme(checked);
      return;
    }

    const transition = document.startViewTransition(async () => {
      toggleTheme(checked);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: !checked ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: "cubic-bezier(.1, 0, 0.1, 0.9)",
          pseudoElement: !checked
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        },
      );
    });
  };

  return (
    <Switch
      ref={switchRef}
      checked={isDark}
      onChange={handleThemeChange}
      checkedChildren={
        <BsMoonStars className="text-sm inline-flex items-center justify-center h-full -mt-0.5" />
      }
      unCheckedChildren={
        <BsSun className="text-sm inline-flex items-center justify-center h-full -mt-0.5" />
      }
      className="bg-gray-300 dark:bg-gray-600"
    />
  );
}

export default ThemeSwitch;
