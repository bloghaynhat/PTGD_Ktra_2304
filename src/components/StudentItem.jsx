import { useState } from "react";

export default function StudentItem({ student, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [studentClass, setStudentClass] = useState(student.class);
  const [age, setAge] = useState(student.age);

  const handleSave = () => {
    const updated = { ...student, name, class: studentClass, age: parseInt(age) };
    onUpdate(updated);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow p-3 rounded">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            className="w-full p-1 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-1 border rounded"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-1 border rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold">{student.name}</div>
            <div className="text-sm text-gray-600">
              Lớp: {student.class} - Tuổi: {student.age}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="text-sm bg-yellow-400 text-white px-3 py-1 rounded"
              onClick={() => setIsEditing(true)}
            >
              Sửa
            </button>
            <button
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => onDelete(student.id)}
            >
              Xoá
            </button>
          </div>
        </div>
      )}
    </div>
  );
}