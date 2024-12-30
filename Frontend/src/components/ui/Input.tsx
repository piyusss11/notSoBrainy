interface InputProps {
  placeholder: string;
  className?: string;
  type?: string;
  reference?: React.RefObject<HTMLInputElement>;
}
const Input = ({ placeholder, className, type, reference }: InputProps) => {
  return (
    <input
      ref={reference}
      placeholder={placeholder}
      type={type ? type : "text"}
      className={`w-full px-2 py-2 border rounded my-2 ${className}`}
    ></input>
  );
};

export default Input;
