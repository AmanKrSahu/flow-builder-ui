import Image from "next/image";

import { Button } from "@/components/ui/button";

export function UserAvatar() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full">
      <Image
        src="/images/avatar/female-avatar.png"
        alt="User profile"
        width={24}
        height={24}
        className="rounded-full object-cover w-8 h-8"
      />
    </Button>
  );
}
