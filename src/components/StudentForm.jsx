import { useState } from "react";

export default function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !studentClass || !age) return alert("Vui lòng nhập đầy đủ thông tin");
    onAddStudent({ name, class: studentClass, age: parseInt(age) });
    setName("");
    setStudentClass("");
    setAge("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-gray-100 rounded space-y-2"
    >
      <input
        type="text"
        placeholder="Họ tên"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lớp"
        className="w-full p-2 border rounded"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tuổi"
        className="w-full p-2 border rounded"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Thêm sinh viên
      </button>
    </form>
  );
}
