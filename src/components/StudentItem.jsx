import { useState } from "react";

export default function StudentItem({ student, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [studentClass, setStudentClass] = useState(student.class);
  const [age, setAge] = useState(student.age);

  const handleSave = () => {
    const updated = { ...student, name, class: studentClass, age: Number.parseInt(age) };
    onUpdate(updated);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 border-opacity-60 hover:shadow-lg transition-all duration-300 p-4">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor={`name-${student.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Họ tên
            </label>
            <input
              id={`name-${student.id}`}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`class-${student.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Lớp
            </label>
            <input
              id={`class-${student.id}`}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`age-${student.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Tuổi
            </label>
            <input
              id={`age-${student.id}`}
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-200 flex-1 font-medium"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 flex-1 font-medium"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="font-semibold text-lg text-gray-800">{student.name}</div>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Lớp: {student.class}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Tuổi: {student.age}
              </span>
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <button
              className="text-sm bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600 transition-colors duration-200 font-medium"
              onClick={() => setIsEditing(true)}
            >
              Sửa
            </button>
            <button
              className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
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
