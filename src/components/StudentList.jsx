import StudentItem from "./StudentItem";

export default function StudentList({ students, onDeleteStudent, onUpdateStudent }) {
  return (
    <div className="space-y-2">
      {students.map((student) => (
        <StudentItem
          key={student.id}
          student={student}
          onDelete={onDeleteStudent}
          onUpdate={onUpdateStudent}
        />
      ))}
    </div>
  );
}
