export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent('Mentoria com Marcelo Cerutti: Performance Comercial no Agro');
  const details = encodeURIComponent(
    'Mentoria exclusiva com Marcelo Cerutti.\n\nConheça os grandes perfis de negociadores do Agro e entenda o que você pode extrair de cada um para ampliar seu repertório comercial.\n\nLink da transmissão será disponibilizado no grupo oficial do WhatsApp.'
  );
  const location = encodeURIComponent('Online via Grupo VIP do WhatsApp');
  // 10 de outubro de 2026 às 08:00 BRT (11:00 UTC) até 09:30 BRT (12:30 UTC)
  const dates = '20261010T110000Z/20261010T123000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Marcelo Cerutti//Mentoria Comercial Agro//PT',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'SUMMARY:Mentoria com Marcelo Cerutti: Negociação Comercial no Agro',
    'DESCRIPTION:Conheça os grandes perfis de negociadores do Agro e entenda o que você pode extrair de cada um para ampliar seu repertório comercial. Acesse o grupo VIP no WhatsApp para o link da transmissão.',
    'LOCATION:Online (Grupo Oficial do WhatsApp)',
    'DTSTART:20261010T110000Z',
    'DTEND:20261010T123000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'mentoria-marcelo-cerutti-agro.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
