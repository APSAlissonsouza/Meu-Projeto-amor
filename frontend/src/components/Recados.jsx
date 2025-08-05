import React, { useEffect, useState } from 'react';
import api from '../api';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Recados() {
  const [recados, setRecados] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function carregarRecados() {
    try {
      const res = await api.get('/recados');
      setRecados(res.data);
    } catch {
      setErro('Erro ao carregar recados.');
    }
  }

  async function enviarRecado(e) {
    e.preventDefault();
    if (!mensagem) return;
    try {
      await api.post('/recados', { mensagem });
      setMensagem('');
      carregarRecados();
    } catch {
      setErro('Erro ao enviar recado.');
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  useEffect(() => {
    carregarRecados();
  }, []);

  return (
    <div style={{maxWidth:600, margin:'auto', padding:20}}>
      <h2>Seus Recados</h2>
      <button onClick={handleLogout} style={{float:'right', background:'#cc0000', color:'white', border:'none', padding:'8px 12px', borderRadius:5}}>Sair</button>
      <form onSubmit={enviarRecado}>
        <textarea
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          placeholder="Deixe seu recado..."
          style={{width:'100%', height:100, marginBottom:10}}
        />
        <button type="submit" style={{padding:'10px 20px', background:'#ff0040', color:'white', border:'none', borderRadius:8}}>Enviar</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
      <ul>
        {recados.map(r => (
          <li key={r._id} style={{marginBottom: '10px', padding:'10px', background:'#ffe6e6', borderRadius: '8px'}}>
            {r.mensagem}
            <br />
            <small>{new Date(r.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
