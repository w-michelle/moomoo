import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="h-[150px] border-[1px] border-black border-r-0 border-l-0 w-full flex flex-col justify-center items-center">
      <ul className="flex flex-wrap items-center justify-center gap-4 md:text-sm text-xs mt-6">
        <li>FAQ</li>
        <li>PRESS</li>
        <li>JOBS</li>
        <li>CONTACT</li>
        <li>TERMS OF SERVICE</li>
        <li>REFUND POLICY</li>
      </ul>
    </div>
  );
};

export default Footer;
