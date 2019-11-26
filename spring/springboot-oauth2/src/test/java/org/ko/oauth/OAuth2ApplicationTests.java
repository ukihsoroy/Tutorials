package org.ko.oauth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class OAuth2ApplicationTests {

	@Autowired private PasswordEncoder passwordEncoder;

	@Test
	void whenPasswordEncoderSuccess() {
		String password = passwordEncoder.encode("client-secret");
		System.out.println("password: " + password);
	}

}
