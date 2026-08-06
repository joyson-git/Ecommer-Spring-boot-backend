package com.Ecommer.service;

import com.Ecommer.model.AuthUser;
import com.Ecommer.repository.AuthRepository;
import com.Ecommer.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(AuthRepository authRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    public String signup(AuthUser user) {

        Optional<AuthUser> exisitingUser = authRepository.findByEmail(user.getEmail());

        if(exisitingUser.isPresent()){
            return " the user is already present";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        authRepository.save(user);

        return " user register is  successful";
    }


    public String login(AuthUser user) {

        System.out.println("Login request email: " + user.getEmail());

        Optional<AuthUser> dbUser = authRepository.findByEmail(user.getEmail());

        if (dbUser.isEmpty()) {
            System.out.println("User not found in DB");
            return "Invalid email or password";
        }

        AuthUser existingUser = dbUser.get();

        System.out.println("DB password: " + existingUser.getPassword());
        System.out.println("Entered password: " + user.getPassword());

        boolean passMatch =
                passwordEncoder.matches(user.getPassword(), existingUser.getPassword());

        if (passMatch) {
            return jwtUtil.generateToken(existingUser.getEmail(), existingUser.getRole());
        }

        return "Invalid email or password";
    }
}
