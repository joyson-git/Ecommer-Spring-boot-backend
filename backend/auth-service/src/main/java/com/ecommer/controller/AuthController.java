package com.ecommer.controller;

import com.ecommer.model.AuthUser;

import com.ecommer.service.AuthService;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

   private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody AuthUser user) {
        return authService.signup(user);
    }


    @PostMapping("/login")
     public  String login(@RequestBody AuthUser user){
        return authService.login(user);
}



}