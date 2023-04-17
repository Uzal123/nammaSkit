
interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, name, type, value, onChange }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name as string} className="block mb-2 font-medium text-md">
        {label}
      </label>
      <input
        id={name as string}
        name={name as string}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default Input;
