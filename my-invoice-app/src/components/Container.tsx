import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}

const Container = (props: ContainerProps) => {
  const { children, className, ...rest } = props;

  return (
    <>
      <div {...rest} className={cn(className, "max-w-5xl mx-auto px-5")}>
        {children}
      </div>
    </>
  );
};

export default Container;
