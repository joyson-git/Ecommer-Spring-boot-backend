package com.Ecommer.service;


import com.Ecommer.entity.Role;
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
        Optional<AuthUser> existingUser = authRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return " the user is already present";
        }

        String hashPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);

        user.setRole(Role.CUSTOMER);

        authRepository.save(user);

        return " User registered successfully";

    }



    public String login(AuthUser user) {
        Optional<AuthUser> dbUser = authRepository.findByEmail(user.getEmail());
        if (dbUser.isEmpty()) {
            return "Invalid email or password";
        }
        AuthUser existingUser = dbUser.get();

        boolean passMatch = passwordEncoder.matches(user.getPassword(), existingUser.getPassword());

        if (passMatch) {
  String roleStr = "USER";
  if(existingUser.getRole()!=null){
      roleStr = existingUser.getRole().toString();
  }
return jwtUtil.generateToken(existingUser.getEmail(),roleStr);
        }
        return "Invalid email or password";
    }

}
