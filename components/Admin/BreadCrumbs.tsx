import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const BreadCrumbs = () => {
  const pathName = usePathname();
  const [items, setItems] = useState<any>();
  useLayoutEffect(() => {
    if (pathName) {
      let itemsArray: any = [];
      let segment = pathName.split("/");
      console.log("the setgments is", segment);

      if (segment[1] === "admin") {
        const obj = [
          {
            title: "Admin",
          },
        ];
        itemsArray = [...itemsArray, ...obj];
        if (segment.length === 2) {
          itemsArray = [
            ...itemsArray,
            {
              title: <Link href="/admin">Companies</Link>,
            },
          ];
        }
        if (segment.length === 2) {
          itemsArray = [
            ...itemsArray,
            {
              title: <Link href="/admin">Companies</Link>,
            },
          ];
        }
      }
      // setItems();
    }
  }, [pathName]);
  return <div>BreadCrumbs</div>;
};

export default BreadCrumbs;
