package com.example.FriendZone.Configuration;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.FriendZone.Utils.UtilsHandleJwtToken;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Autowired
        private UtilsHandleJwtToken utilsHandleJwtToken;

        private final String[] GetPublicEnpoints = {
                        "/FriendZone/Login",
                        "/FriendZone/SignUp",
                        "/FriendZone/ForgotPassword",
                        "/FriendZone",
                        "/user/getEditDetail",
                        "/FriendZone/test",
                        "/FriendZone/postDetail",
                        "/FriendZone/newFeed",
                        "/FriendZone/allFriend",
                        "/FriendZone/createGroup",
                        "/FriendZone/group",
                        "/FriendZone/requestJoinGroup",
                        "/FriendZone/allMember",
                        "/FriendZone/getPostToConfirm",
                        "/FriendZone/media",
                        "/FriendZone/allFile"
        };

        private final String[] PostPublicEnpoints = {
                        "/user/login_without_jwtToken",
                        "/user/checkFileExist",
                        "/user/create_user",
                        "/user/updateDetail"
        };

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

                httpSecurity.authorizeHttpRequests(
                                request -> request.requestMatchers(HttpMethod.GET, GetPublicEnpoints).permitAll()
                                                .requestMatchers("/static/**", "/css/**", "/js/**",
                                                                "/fontawesome-free-6.5.1-web/**", "/Img/**",
                                                                "/FileUser/**")
                                                .permitAll() // Allow access to static
                                                .requestMatchers(HttpMethod.POST, PostPublicEnpoints).permitAll()
                                                .anyRequest().authenticated());

                httpSecurity.oauth2ResourceServer(
                                oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer
                                                .decoder(this.utilsHandleJwtToken.jwtDecoder()))
                                                .authenticationEntryPoint(new JWTAuthenticationEntryPoint()));

                httpSecurity.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable());

                return httpSecurity.build();
        }
}
