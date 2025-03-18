const InputField = ({ label, type, value, name, onChange }) => (
    <div className="mb-4">
        <label className="block text-gray-600">{label}</label>
        <input
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>
);

export default InputField;
