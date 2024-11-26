import { inputProps } from "@/app/types/types";

const Input = ({ name, type, placeholder, value, defaultValue }: inputProps) => {
    return (
        <div>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue ?? ""}
                value={value}
                required={true}
                className="block w-full p-4 mx-2 border rounded-lg placeholder-gray-400 text-black"
            />
        </div>
    )
}

export default Input
