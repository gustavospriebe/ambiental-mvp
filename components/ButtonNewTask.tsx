"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AxiosResponse } from "axios";

interface ButtonNewTask extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  action?: () => Promise<AxiosResponse<any, any>>;
}

const ButtonNewTask = ({ action, children, className }: ButtonNewTask) => {
  if (!action) {
    return;
  }

  return (
    <Button className={cn("", className ?? "")} onClick={async () => await action()}>
      {children}
    </Button>
  );
};

export default ButtonNewTask;
