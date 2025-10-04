
// package com.wecp.car_rental_management_system.config;

// import com.wecp.car_rental_management_system.jwt.JwtRequestFilter;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.wecp.car_rental_management_system.jwt.JwtRequestFilter;
// import com.wecp.car_rental_management_system.service.UserService;

// @Configuration
// @EnableWebSecurity
// @EnableGlobalMethodSecurity(prePostEnabled = true)
// public class SecurityConfig extends WebSecurityConfigurerAdapter {

//     private final UserService userService;
//     private final JwtRequestFilter jwtRequestFilter;
//     private final PasswordEncoder passwordEncoder;

//     @Autowired
//     public SecurityConfig(UserService userService, JwtRequestFilter jwtRequestFilter, PasswordEncoder passwordEncoder) {
//         this.userService = userService;
//         this.jwtRequestFilter = jwtRequestFilter;
//         this.passwordEncoder = passwordEncoder;
//     }

//     @Override
//     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
//     }

//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
//         http.cors().and().csrf().disable()
//             .authorizeRequests()

//             // Public endpoints
//             .antMatchers("/api/user/register", "/api/user/login").permitAll()

//             // ADMINISTRATOR endpoints
//             .antMatchers(HttpMethod.GET, "/api/administrator/car-categories/**").hasAuthority("ADMINISTRATOR")
//             .antMatchers(HttpMethod.POST, "/api/administrator/car-categories/**").hasAuthority("ADMINISTRATOR")
//             .antMatchers(HttpMethod.PUT, "/api/administrator/car-categories/**").hasAuthority("ADMINISTRATOR")
//             .antMatchers(HttpMethod.DELETE, "/api/administrator/car-categories/**").hasAuthority("ADMINISTRATOR")
//             .antMatchers(HttpMethod.GET, "/api/administrator/reports/bookings").hasAuthority("ADMINISTRATOR")
//             .antMatchers(HttpMethod.GET, "/api/administrator/reports/payments").hasAuthority("ADMINISTRATOR")

//             // AGENT endpoints
//             // .antMatchers(HttpMethod.GET, "/api/agent/car/**").hasAuthority("AGENT")
//             .antMatchers(HttpMethod.GET, "/api/agent/cars").hasAuthority("AGENT")
//             // .antMatchers(HttpMethod.POST, "/api/agent/car/**").hasAuthority("AGENT")
//             .antMatchers(HttpMethod.POST, "/api/agent/car").hasAuthority("AGENT")
//             .antMatchers(HttpMethod.PUT, "/api/agent/car/**").hasAuthority("AGENT")
//             // .antMatchers(HttpMethod.DELETE, "/api/agent/car/**").hasAuthority("AGENT")
//             // .antMatchers(HttpMethod.GET, "/api/agent/bookings/**").hasAuthority("AGENT")
//             .antMatchers(HttpMethod.GET, "/api/agent/bookings").hasAuthority("AGENT")
//             // .antMatchers(HttpMethod.POST, "/api/agent/bookings/**").hasAuthority("AGENT")
//             .antMatchers(HttpMethod.PUT, "/api/agent/bookings/**").hasAuthority("AGENT")
//             // .antMatchers(HttpMethod.GET, "/api/agent/payment/**").hasAuthority("AGENT")
//             .antMatchers(HttpMethod.POST, "/api/agent/payment/**").hasAuthority("AGENT")

//             // CUSTOMER endpoints
//             .antMatchers(HttpMethod.GET, "/api/customers/cars/available").hasAuthority("CUSTOMER")
//             .antMatchers(HttpMethod.POST, "/api/customers/booking").hasAuthority("CUSTOMER")
//             .antMatchers(HttpMethod.GET, "/api/customers/booking/**").hasAuthority("CUSTOMER")

//             // any other request requires authentication
//             .anyRequest().authenticated()

//             .and()
//             .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

//         // Add JWT filter before UsernamePasswordAuthenticationFilter
//         http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//     }

//     @Bean
//     @Override
//     public AuthenticationManager authenticationManagerBean() throws Exception {
//         return super.authenticationManagerBean();
//     }
// }

 
package com.wecp.car_rental_management_system.config;
 
import com.wecp.car_rental_management_system.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
 
import com.wecp.car_rental_management_system.jwt.JwtRequestFilter;
import com.wecp.car_rental_management_system.service.UserService;
 
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
 
    private final UserService userService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;
 
    @Autowired
    public SecurityConfig(UserService userService, JwtRequestFilter jwtRequestFilter, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtRequestFilter = jwtRequestFilter;
        this.passwordEncoder = passwordEncoder;
    }
 
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
    }
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .authorizeRequests()
 
            // Public endpoints
            .antMatchers("/api/user/register", "/api/user/login").permitAll()
 
            // ADMINISTRATOR endpoints
            .antMatchers( "/api/administrator/**").hasAuthority("ADMINISTRATOR")
            // .antMatchers(HttpMethod.POST, "/api/administrator/car-categories/**").hasAuthority("ADMINISTRATOR")
            // .antMatchers(HttpMethod.PUT, "/api/administrator/car-categories/**").hasAuthority("ADMINISTRATOR")
            // .antMatchers(HttpMethod.DELETE, "/api/administrator/car-categories/**").hasAuthority("ADMINISTRATOR")
            // .antMatchers(HttpMethod.GET, "/api/administrator/reports/bookings").hasAuthority("ADMINISTRATOR")
            // .antMatchers(HttpMethod.GET, "/api/administrator/reports/payments").hasAuthority("ADMINISTRATOR")
 
            // AGENT endpoints
            .antMatchers( "/api/agent/**").hasAuthority("AGENT")
            // .antMatchers(HttpMethod.POST, "/api/agent/car/**").hasAuthority("AGENT")
            // .antMatchers(HttpMethod.PUT, "/api/agent/car/**").hasAuthority("AGENT")
            // .antMatchers(HttpMethod.DELETE, "/api/agent/car/**").hasAuthority("AGENT")
            // .antMatchers(HttpMethod.GET, "/api/agent/bookings/**").hasAuthority("AGENT")
            // .antMatchers(HttpMethod.POST, "/api/agent/bookings/**").hasAuthority("AGENT")
            // .antMatchers(HttpMethod.PUT, "/api/agent/bookings/**").hasAuthority("AGENT")
            // .antMatchers(HttpMethod.GET, "/api/agent/payment/**").hasAuthority("AGENT")
 
            // CUSTOMER endpoints
            .antMatchers( "/api/customers/**").hasAuthority("CUSTOMER")
            // .antMatchers(HttpMethod.POST, "/api/customers/booking").hasAuthority("CUSTOMER")
            // .antMatchers(HttpMethod.GET, "/api/customers/booking/**").hasAuthority("CUSTOMER")
 
            // any other request requires authentication
            .anyRequest().authenticated()
 
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
 
        // Add JWT filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
 
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}