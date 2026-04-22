package com.gearshare.auth.controller;

import com.gearshare.auth.entity.RefreshToken;
import com.gearshare.auth.entity.User;
import com.gearshare.auth.repository.RefreshTokenRepository;
import com.gearshare.auth.security.JwtUtils;
import com.gearshare.auth.service.AuthService;
import com.gearshare.auth.service.RefreshTokenService;
import com.gearshare.auth.service.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        User user = authService.register(req.getUsername(), req.getEmail(), req.getPassword());
        return ResponseEntity.ok(Map.of("message", "Registered successfully", "username", user.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        User user = authService.authenticate(req.getUsername(), req.getPassword());
        UserDetails details = userDetailsService.loadUserByUsername(user.getUsername());
        String accessToken = jwtUtils.generateToken(details);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        return ResponseEntity.ok(new TokenResponse(accessToken, refreshToken.getToken()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> body) {
        String rawToken = body.get("refreshToken");
        RefreshToken refreshToken = refreshTokenRepository.findByToken(rawToken)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.UNAUTHORIZED, "Refresh token not found"));

        refreshTokenService.verifyExpiration(refreshToken);

        UserDetails details = userDetailsService.loadUserByUsername(refreshToken.getUser().getUsername());
        String newAccess = jwtUtils.generateToken(details);
        // Rotate: issue a fresh refresh token
        RefreshToken newRefresh = refreshTokenService.createRefreshToken(refreshToken.getUser());
        return ResponseEntity.ok(new TokenResponse(newAccess, newRefresh.getToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetails principal) {
        if (principal != null) {
            refreshTokenRepository.findByToken(principal.getUsername()).ifPresent(rt ->
                    refreshTokenService.revokeByUser(rt.getUser()));
        }
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    // ── DTOs ─────────────────────────────────────────────────────────────────

    @Data
    static class RegisterRequest {
        @NotBlank private String username;
        @Email @NotBlank private String email;
        @NotBlank private String password;
    }

    @Data
    static class LoginRequest {
        @NotBlank private String username;
        @NotBlank private String password;
    }

    record TokenResponse(String accessToken, String refreshToken) {}
}
