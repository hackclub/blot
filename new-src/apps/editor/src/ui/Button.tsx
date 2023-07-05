import styles from "./Button.module.css";
import type { ComponentChild, JSX } from "preact";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "accent";
    class?: string | undefined;
    disabled?: boolean;
    loading?: boolean;
    children?: ComponentChild;
    role?: JSX.HTMLAttributes<HTMLButtonElement>["role"];
    onClick?: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button
            class={`
				${styles.button}
				${props.variant === "secondary" ? styles.secondary : props.variant === "accent" ? styles.accent : ""}
				${props.loading ? styles.loading : ""}
				${props.class ?? ""}
			`}
            role={props.role ?? "button"}
            type={props.type ?? "button"}
            disabled={props.disabled || props.loading}
            onClick={() => props.onClick?.()}
        >
            {props.children}
        </button>
    );
}
