// For CSS
declare module "*.module.css" {
  const classes: {
    use: (props: {target: ShadowRoot | null}) => void;
    unuse: () => void;
    locals: Record<string, string>;
  };
  export default classes;
}

declare module "*.css";
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

// All SB imports
declare module "@simplybusiness/*";
