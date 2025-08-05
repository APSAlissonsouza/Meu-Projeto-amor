import React, { useState } from 'react';
import api from '../api';
import { salvarToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, senha });
      salvarToken(res.data.token);
      localStorage.setItem('nome', res.data.nome);
      localStorage.setItem('aniversarioNamoro', res.data.aniversarioNamoro);
      localStorage.setItem('aniversarioNoivado', res.data.aniversarioNoivado);
      navigate('/recados');
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro no login');
    }
  }

  return (
    <div style={{maxWidth:400, margin:'auto', padding:20}}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:'100%', padding:10, margin:'10px 0'}} />
        <input type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)} required style={{width:'100%', padding:10, margin:'10px 0'}} />
        <button type="submit" style={{padding:'10px 20px', background:'#ff0040', color:'white', border:'none', borderRadius:8}}>Entrar</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
    </div>
  );
}
