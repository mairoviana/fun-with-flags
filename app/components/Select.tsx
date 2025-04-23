import { ChevronDownIcon } from '@heroicons/react/24/outline';

type SelectProps = {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
};

const Select = ({ options, selected, setSelected }: SelectProps) => {
  const selectOptions = ['All regions', ...options];

  return (
    <div className="w-1/3">
      <select
        value={selected}
        onChange={({ target }) => setSelected(target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        name=""
        id=""
      >
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="hidden">
        <ChevronDownIcon className="size-4" />
      </span>
    </div>
  );
};

export default Select;
