import React from "react";
import Header from "../../Header/Header";
import Foooter from "../../Footer/Foooter";
type ChildProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: ChildProps) => {
  return (
    <div>
      <Header />
      {children}
      <Foooter />
    </div>
  );
};

export default MainLayout;
