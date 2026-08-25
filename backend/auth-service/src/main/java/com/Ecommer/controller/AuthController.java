package com.Ecommer.controller;

import com.Ecommer.model.AuthUser;

import com.Ecommer.service.AuthService;
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