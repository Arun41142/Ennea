package com.web.DemoWebApp.Controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

//    if we use the controller instead of the rest controller then we need to use the annotation of response body to render the data correctly
    @RequestMapping("/")
    public String greet(){
        System.out.println("hello");
        return "Hello Welcome to my new WebPage....";
    }

    @RequestMapping("/about")
    public String about(){
        return "This is from the about page";
    }

}
