interface InputProps {
  placeholder: string;
  // reference?: any;
}
const Input = ({  placeholder }: InputProps) => {
  return (
    <input
      // ref={reference}
      placeholder={placeholder}
      type={"text"}
      className="w-full px-2 py-2 border rounded my-2"
    ></input>
  );
};

export default Input;
