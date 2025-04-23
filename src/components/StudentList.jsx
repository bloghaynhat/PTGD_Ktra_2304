import StudentItem from "./StudentItem";

export default function StudentList({ students }) {
  return (
    <div className="space-y-2">
      {students.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))}
    </div>
  );
}