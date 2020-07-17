package com.uncle.mydues.api;

import javax.servlet.http.HttpServletResponse;

import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.common.spring.security.JWTTokenUtil;
import com.uncle.mydues.common.spring.security.UserDetailsImpl;
import com.uncle.mydues.domain.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class RESTUtenteController {

    @Value("${jwt.token.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private MyDuesService service;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public UtenteResponse login(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws AuthenticationException {
        // Effettuo l'autenticazione
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Genero Token e lo inserisco nell'header di risposta
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenUtil.generateToken(userDetails);
        response.setHeader(tokenHeader, token);

        // Ritorno l'utente
        return new UtenteResponse(((UserDetailsImpl) userDetails).getUtente());
    }
    @PostMapping("/signup")
    public void signup(@RequestBody Utente utente){
        String password= passwordEncoder.encode(utente.getPassword());
        utente.setPassword(password);
        int rand = (int) (Math.random() * ( 301 - 0 ));
        utente.setLink("https://www.gravatar.com/avatar/"+rand+"?d=monsterid&amp;f=y");
        service.signup(utente);
          }


}
