(function(){
    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('passwordConfirm');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordConfirmError = document.getElementById('passwordConfirmError');
    const pwdStrength = document.getElementById('pwdStrength');
    const passwordStrengthText = document.getElementById('passwordStrengthText');
    const formMessage = document.getElementById('formMessage');

    // toggles: there may be multiple toggle buttons (one per password field)
    document.querySelectorAll('.togglePassword').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if(!input) return;
        const t = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', t);
        btn.setAttribute('aria-label', t === 'text' ? 'Ocultar senha' : 'Mostrar senha');
      });
    });

    function clearErrors(){
      nameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
      passwordConfirmError.textContent = '';
      formMessage.textContent = '';
      formMessage.className = 'message';
    }

    function validate(){
      clearErrors();
      let ok = true;
      if(!nameInput.value || nameInput.value.trim().length < 2){
        nameError.textContent = 'Digite seu nome (mínimo 2 caracteres).';
        ok = false;
      }

      if(!emailInput.value){
        emailError.textContent = 'Digite seu email.';
        ok = false;
      } else {
        // validação simples de email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!re.test(emailInput.value)){
          emailError.textContent = 'Formato de email inválido.';
          ok = false;
        }
      }

      if(!passwordInput.value || passwordInput.value.length < 6){
        passwordError.textContent = 'Senha curta (mínimo 6 caracteres).';
        ok = false;
      }
      if(passwordConfirmInput){
        if(passwordConfirmInput.value !== passwordInput.value){
          passwordConfirmError.textContent = 'As senhas não coincidem.';
          ok = false;
        }
      }

      return ok;
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      clearErrors();

      if(!validate()) return;

      // Simula envio para API. Substitua a URL pela sua rota real.
      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value
      };

      formMessage.textContent = 'Enviando...';

      // Exemplo: fetch('/api/register', { method: 'POST', body: JSON.stringify(payload) })...
      // Aqui simulamos um atraso de rede e resposta.
      setTimeout(() => {
        // Simulação de sucesso — troque pela lógica real do backend.
        formMessage.textContent = 'Cadastro realizado com sucesso!';
        formMessage.classList.add('success');
        form.reset();
        if(pwdStrength) pwdStrength.value = 0;
        if(passwordStrengthText) passwordStrengthText.textContent = '';
      }, 900);
    });

    // Checagem de força de senha em tempo real
    function scorePassword(pwd){
      let score = 0;
      if(!pwd) return 0;
      // length
      if(pwd.length >= 8) score++;
      if(/[A-Z]/.test(pwd)) score++;
      if(/[0-9]/.test(pwd)) score++;
      if(/[^A-Za-z0-9]/.test(pwd)) score++;
      return score; // 0..4
    }

    function updateStrength(){
      const s = scorePassword(passwordInput.value);
      if(pwdStrength) pwdStrength.value = s;
      const labels = ['Muito fraca','Fraca','Média','Boa','Forte'];

      if(passwordStrengthText) passwordStrengthText.textContent = labels[s];
    }

    if(passwordInput){
      passwordInput.addEventListener('input', ()=>{
        updateStrength();
        // limpar erro de confirmação se agora bate com a senha
        if(passwordConfirmInput && passwordConfirmInput.value){
          if(passwordConfirmInput.value === passwordInput.value){
            passwordConfirmError.textContent = '';
          }
        }
      });
    }

    if(passwordConfirmInput){
      passwordConfirmInput.addEventListener('input', ()=>{
        if(passwordConfirmInput.value !== passwordInput.value){
          passwordConfirmError.textContent = 'As senhas não coincidem.';
        } else {
          passwordConfirmError.textContent = '';
        }
      });
    }

  })();