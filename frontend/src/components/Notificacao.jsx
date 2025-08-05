import React, { useEffect, useState } from 'react';
import { isSameMonth } from 'date-fns';

export default function Notificacao() {
  const [mostrar, setMostrar] = useState(false);
  const nome = localStorage.getItem('nome');
  const aniversarioNamoro = new Date(localStorage.getItem('aniversarioNamoro'));
  const aniversarioNoivado = new Date(localStorage.getItem('aniversarioNoivado'));
  const hoje = new Date();

  useEffect(() => {
    if (!nome || !aniversarioNamoro || !aniversarioNoivado) return;

    if (isSameMonth(hoje, aniversarioNamoro) || isSameMonth(hoje, aniversarioNoivado)) {
      setMostrar(true);
    }
  }, []);

  if (!mostrar) return null;

  return (
    <div style={{ backgroundColor: '#ffcccc', padding: '10px', margin: '20px', borderRadius: '8px', color: '#b30000' }}>
      <strong>Feliz Aniversário, {nome}!</strong> 🎉 Este mês é especial para seu namoro ou noivado.
    </div>
  );
}
