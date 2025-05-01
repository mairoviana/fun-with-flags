import { ArrowPathIcon } from '@heroicons/react/24/solid';

type LoadingProps = {
  text: string;
};

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="flex flex-col m-auto items-center">
      <ArrowPathIcon className="size-6 mb-2 animate-[spin_1.5s_linear_infinite]" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Loading;
