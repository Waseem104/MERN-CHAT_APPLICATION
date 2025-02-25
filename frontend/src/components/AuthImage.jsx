import { MessageCircle } from "lucide-react";

const AuthImage = ({ title, subTitle }) => {
  return (
    <div className="hidden md:flex w-1/2 bg-primary text-white p-8 flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-md mb-4">{subTitle}</p>
      <div className="text-6xl">
        <MessageCircle />
      </div>
    </div>
  );
};

export default AuthImage;
