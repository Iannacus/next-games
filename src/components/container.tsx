import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[500px] min-w-[350px] px-[10px]">{children}</div>
  );
}
