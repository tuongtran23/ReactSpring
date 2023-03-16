package com.example.course.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents(){
//        throw new IllegalMonitorStateException("Oops error");
        return studentService.getAllStudents();
    };

    @PostMapping
    public void addStudent(@RequestBody Student student){
        // check if email is taken
        studentService.addStudent(student);
    }

    @DeleteMapping(path="{studentId}")
    public void deleteStudent(@PathVariable Long studentId){
        // check if student exists
        studentService.deleteStudent(studentId);

    }
}
