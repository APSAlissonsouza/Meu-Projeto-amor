import React from 'react';

export default function GoogleCalendar() {
  function gerarLinkEvento() {
    const nome = localStorage.getItem('nome') || 'Você';
    const aniversarioNamoro = localStorage.getItem('aniversarioNamoro'); // '2023-10-02'
    if(!aniversarioNamoro) return '#';

    const data = aniversarioNamoro.split('T')[0].replace(/-/g, '');
    const descricao = encodeURIComponent('Aniversário do namoro!');
    const titulo = encodeURIComponent(`${nome} - Aniversário do Namoro`);

    // URL para criar evento no Google Calendar (formato date YYYYMMDD)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${data}/${data}&details=${descricao}`;
  }

  return (
    <div style={{marginTop: 20, textAlign:'center'}}>
      <a href={gerarLinkEvento()} target="_blank" rel="noopener noreferrer" style={{padding:'10px 20px', background:'#d63384', color:'white', borderRadius:8, textDecoration:'none'}}>
        Agendar Aniversário no Google Calendar
      </a>
    </div>
  );
}
