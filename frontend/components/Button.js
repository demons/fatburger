import { useRouter } from "next/navigation";
import { Button as Btn } from "@chakra-ui/react";

export default function Button(props) {
  const router = useRouter();
  const { onClick, href, children, size, ...others } = props;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <Btn onClick={handleClick} size={size || "sm"} {...others}>
      {children}
    </Btn>
  );
}
