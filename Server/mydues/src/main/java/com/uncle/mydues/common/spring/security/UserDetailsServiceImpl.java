package com.uncle.mydues.common.spring.security;

import com.uncle.mydues.business.impl.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.domain.Utente;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private MyDuesService service;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Utente utente = service.findUtenteByUsername(username);
        if (utente == null) {
            throw new UsernameNotFoundException("utente inesistente");
        }
        return new UserDetailsImpl(utente);

    }

}
