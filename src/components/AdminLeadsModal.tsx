import React, { useState, useEffect } from 'react';
import { X, Download, Trash2, Link as LinkIcon, Check, Users, FileSpreadsheet, Send, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Lead } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  whatsappGroupUrl: string;
  onUpdateGroupUrl: (url: string) => void;
}

const DEFAULT_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw93N6jqvSQY0dduJpLBb8DFro21ohgiTSsVlNP5FayRHXlM_KR-H3-_06V9sYaHtjvbw/exec';

export const AdminLeadsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  whatsappGroupUrl,
  onUpdateGroupUrl,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customUrl, setCustomUrl] = useState(whatsappGroupUrl);
  const [sheetsUrl, setSheetsUrl] = useState(DEFAULT_SHEETS_WEBHOOK_URL);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedSheetsSuccess, setSavedSheetsSuccess] = useState(false);
  const [testingSheets, setTestingSheets] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('agro_mentoria_leads') || '[]');
        setLeads(stored);
      } catch {
        setLeads([]);
      }
      setCustomUrl(whatsappGroupUrl);
      setSheetsUrl(localStorage.getItem('agro_sheets_webhook_url') || DEFAULT_SHEETS_WEBHOOK_URL);
    }
  }, [isOpen, whatsappGroupUrl]);

  if (!isOpen) return null;

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const header = ['Nome', 'WhatsApp', 'Email', 'Data/Hora de Cadastro'];
    const rows = leads.map((l) => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.whatsapp.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${new Date(l.createdAt).toLocaleString('pt-BR')}"`,
    ]);

    const csvContent = '\uFEFF' + [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_mentoria_agro_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLeads = () => {
    if (window.confirm('Tem certeza que deseja apagar a lista de leads capturados localmente?')) {
      localStorage.removeItem('agro_mentoria_leads');
      setLeads([]);
    }
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGroupUrl(customUrl.trim());
    localStorage.setItem('agro_whatsapp_group_url', customUrl.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSaveSheetsUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('agro_sheets_webhook_url', sheetsUrl.trim());
    setSavedSheetsSuccess(true);
    setTimeout(() => setSavedSheetsSuccess(false), 2000);
  };

  const handleTestSheets = () => {
    if (!sheetsUrl.trim()) {
      alert('Insira a URL do aplicativo da web do Apps Script primeiro.');
      return;
    }
    setTestingSheets(true);
    fetch(sheetsUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataHora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        nome: 'Lead de Teste (Painel)',
        whatsapp: '(11) 99999-9999',
        email: 'teste@agrovendedor.com.br',
      }),
    })
      .then(() => {
        setTestingSheets(false);
        setTestSent(true);
        setTimeout(() => setTestSent(false), 3000);
      })
      .catch((err) => {
        setTestingSheets(false);
        alert('Erro ao enviar teste: ' + err.message);
      });
  };

  const appsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Adiciona uma nova linha com os dados do lead
    sheet.appendRow([
      data.dataHora || new Date().toLocaleString("pt-BR"),
      data.nome || "",
      data.whatsapp || "",
      data.email || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Painel de Leads & Link do WhatsApp</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Configure WhatsApp URL */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
              Link oficial do grupo do WhatsApp
            </label>
            <form onSubmit={handleSaveUrl} className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://chat.whatsapp.com/..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : null}
                {savedSuccess ? 'Salvo' : 'Salvar link'}
              </button>
            </form>
            <p className="text-[11px] text-slate-500 mt-1">
              Este link será aberto quando o participante clicar em &quot;ENTRAR NO GRUPO DA MENTORIA&quot;.
            </p>
          </div>

          {/* Integração Automática com Google Planilhas */}
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                Webhook do Google Planilhas (Apps Script)
              </label>
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{showCode ? 'Ocultar Código' : 'Ver Código do Apps Script'}</span>
                {showCode ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <form onSubmit={handleSaveSheetsUrl} className="flex gap-2">
              <input
                type="url"
                value={sheetsUrl}
                onChange={(e) => setSheetsUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="flex-1 px-3 py-2 text-xs sm:text-sm border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer"
              >
                {savedSheetsSuccess ? <Check className="w-3.5 h-3.5" /> : null}
                {savedSheetsSuccess ? 'Salvo!' : 'Salvar Webhook'}
              </button>
              {sheetsUrl && (
                <button
                  type="button"
                  onClick={handleTestSheets}
                  disabled={testingSheets}
                  className="px-3 py-2 bg-white border border-emerald-400 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Enviar linha de teste para a planilha"
                >
                  <Send className="w-3 h-3" />
                  <span>{testingSheets ? 'Enviando...' : testSent ? 'Linha Enviada!' : 'Testar'}</span>
                </button>
              )}
            </form>

            <p className="text-[11px] text-emerald-800/80">
              Sempre que alguém preencher o formulário, os dados serão gravados em tempo real na sua planilha Google.
            </p>

            {/* Código e Passo a Passo Expansível */}
            {showCode && (
              <div className="mt-2 bg-slate-900 rounded-lg p-3 text-white text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-[11px] text-emerald-400">Código para o Apps Script (Código.gs)</span>
                  <button
                    onClick={handleCopyCode}
                    type="button"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-emerald-300/90 overflow-x-auto p-1 leading-relaxed">
                  {appsScriptCode}
                </pre>
              </div>
            )}
          </div>

          {/* Leads count and actions */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Leads cadastrados ({leads.length})
              </h4>
              <p className="text-xs text-slate-500">
                Registros armazenados nesta sessão de demonstração.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {leads.length > 0 && (
                <>
                  <button
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Exportar CSV
                  </button>
                  <button
                    onClick={handleClearLeads}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors"
                    title="Limpar todos os leads"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Leads table */}
          {leads.length === 0 ? (
            <div className="py-8 text-center bg-slate-50 rounded-xl border border-slate-200/60 text-slate-400 text-xs">
              Nenhum lead cadastrado ainda. Faça um teste preenchendo o formulário.
            </div>
          ) : (
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] sticky top-0">
                    <tr>
                      <th className="p-2.5">Nome</th>
                      <th className="p-2.5">WhatsApp</th>
                      <th className="p-2.5">E-mail</th>
                      <th className="p-2.5">Horário</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/70">
                        <td className="p-2.5 font-medium text-slate-900">{l.name}</td>
                        <td className="p-2.5 text-slate-700 font-mono">{l.whatsapp}</td>
                        <td className="p-2.5 text-slate-600">{l.email}</td>
                        <td className="p-2.5 text-slate-400 whitespace-nowrap">
                          {new Date(l.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
