package com.example.course.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();

    }

    public void addStudent(Student student) {
        // check if email is taken, later implementation
        studentRepository.save(student);

    }

    public void deleteStudent(Long studentId){
        // check if student exists
        studentRepository.deleteById(studentId);
    }
}
