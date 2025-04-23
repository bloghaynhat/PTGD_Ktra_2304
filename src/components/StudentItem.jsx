export default function StudentItem({ student, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white shadow p-3 rounded">
      <div>
        <div className="font-semibold">{student.name}</div>
        <div className="text-sm text-gray-600">
          Lớp: {student.class} - Tuổi: {student.age}
        </div>
      </div>
      <button
        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => onDelete(student.id)}
      >
        Xoá
      </button>
    </div>
  );
}
