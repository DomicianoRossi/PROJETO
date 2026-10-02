// Funções compartilhadas pelas páginas que leem window.AW_DADOS (gerado por scripts/build_dados.py).
(function () {
  var DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  var MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var TEMAS = { 'REGULAÇÃO': 'Regulação', 'LANÇAMENTOS': 'Lançamentos', 'CASOS': 'Casos', 'PESQUISA': 'Pesquisa', 'MERCADO': 'Mercado' };
  var dois = function (n) { return (n < 10 ? '0' : '') + n; };
  var chaveDia = function (d) { return d.getFullYear() + '-' + dois(d.getMonth() + 1) + '-' + dois(d.getDate()); };

  function quando(iso) {
    var d = new Date(iso), hoje = new Date();
    var ontem = new Date(hoje); ontem.setDate(hoje.getDate() - 1);
    var dias = Math.round((new Date(chaveDia(hoje)) - new Date(chaveDia(d))) / 86400000);
    var hora = dois(d.getHours()) + ':' + dois(d.getMinutes());
    var diaRel = dias === 0 ? 'Hoje' : dias === 1 ? 'Ontem' : DIAS[d.getDay()].charAt(0).toUpperCase() + DIAS[d.getDay()].slice(1);
    return {
      chave: chaveDia(d),
      hora: hora,
      relativo: dias === 0 ? hora : dias === 1 ? 'ontem' : dias + ' dias',
      diaRel: diaRel,
      dataCurta: d.getDate() + ' ' + MESES[d.getMonth()],
      dataLonga: DIAS[d.getDay()] + ', ' + d.getDate() + ' ' + MESES[d.getMonth()] + ' ' + d.getFullYear() + ' · ' + hora,
    };
  }

  function radar() {
    var dados = (window.AW_DADOS && window.AW_DADOS.radar) || [];
    return dados.map(function (n) {
      var q = quando(n.publicado_em);
      return Object.assign({}, n, {
        quando: q,
        temaBonito: TEMAS[n.tema] || n.tema,
        url: 'AgenticWay%20Radar%20Artigo.dc.html?id=' + encodeURIComponent(n.id),
      });
    });
  }

  var bonito = function (s) { return s.charAt(0) + s.slice(1).toLowerCase(); };

  function casos() {
    var dados = (window.AW_DADOS && window.AW_DADOS.na_operacao) || [];
    return dados.map(function (c, i) {
      var q = quando(c.publicado_em);
      return Object.assign({}, c, {
        quando: q,
        setorBonito: bonito(c.setor),
        processoBonito: bonito(c.processo),
        url: 'AgenticWay%20Na%20Operacao%20Artigo.dc.html?id=' + encodeURIComponent(c.id),
        numero: c.numeros[0].valor,
        numeroLegenda: c.numeros[0].legenda,
        capaClasse: c.status === 'parou' ? 'aw-capa aw-capa-papel' : (i % 2 ? 'aw-capa aw-capa-azul' : 'aw-capa'),
      });
    });
  }

  function analises() {
    var dados = (window.AW_DADOS && window.AW_DADOS.analise) || [];
    return dados.map(function (a) {
      return Object.assign({}, a, {
        quando: quando(a.publicado_em),
        url: 'AgenticWay%20Analise%20Artigo.dc.html?id=' + encodeURIComponent(a.id),
      });
    });
  }

  function hoje() {
    var d = new Date();
    return DIAS[d.getDay()] + ', ' + d.getDate() + ' ' + MESES[d.getMonth()] + ' ' + d.getFullYear();
  }

  function param(nome) {
    return new URLSearchParams(window.location.search).get(nome);
  }

  window.AW = {
    quando: quando, radar: radar, casos: casos, analises: analises, hoje: hoje, param: param, temas: TEMAS,
    assinatura: function () { return (window.AW_DADOS && window.AW_DADOS.assinatura) || ''; },
  };
})();
