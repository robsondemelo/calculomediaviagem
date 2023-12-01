function calcularMedia() {
  const kmInicialInput = document.getElementById('kmInicial');
  const kmFinalInput = document.getElementById('kmFinal');
  const litrosInput = document.getElementById('litros');

  const kmInicial = parseFloat(kmInicialInput.value);
  const kmFinal = parseFloat(kmFinalInput.value);
  const litros = parseFloat(litrosInput.value);

  if (isNaN(kmInicial) || isNaN(kmFinal) || isNaN(litros)) {
    alert('Por favor, preencha todos os campos com valores numéricos.');
    return;
  }

  const consumoAtual = (kmFinal - kmInicial) / litros;
  const resultadosDiv = document.getElementById('resultados');

  // Verifica se já há dados salvos no armazenamento local
  let registros = JSON.parse(localStorage.getItem('registros')) || [];

  registros.push({
    kmInicial,
    kmFinal,
    litros,
    consumoAtual
  });

  // Atualiza o armazenamento local com os novos registros
  localStorage.setItem('registros', JSON.stringify(registros));

  // Limpa os campos de entrada
  kmInicialInput.value = '';
  kmFinalInput.value = '';
  litrosInput.value = '';

  // Limpa a div de resultados
  resultadosDiv.innerHTML = '';

  // Calcula e exibe a média geral
  const mediaGeral = registros.reduce((total, registro) => total + registro.consumoAtual, 0) / registros.length;

  resultadosDiv.innerHTML += `<p>Média Geral: ${mediaGeral.toFixed(2)} km/l</p>`;

  // Exibe os registros individuais
  resultadosDiv.innerHTML += '<h2>Registros Individuais:</h2>';
  registros.forEach((registro, index) => {
    resultadosDiv.innerHTML += `
      <p>Registro ${index + 1} - ${registro.kmInicial} km a ${registro.kmFinal} km, ${registro.litros} litros (${registro.consumoAtual.toFixed(2)} km/l)</p>
    `;
  });

  // Adiciona o botão de limpar registros
  resultadosDiv.innerHTML += '<button onclick="limparRegistros()">Limpar Registros</button>';
}

function limparRegistros() {
  // Limpa o armazenamento local, a div de resultados e os campos de entrada
  localStorage.removeItem('registros');
  document.getElementById('resultados').innerHTML = '';
  document.getElementById('kmInicial').value = '';
  document.getElementById('kmFinal').value = '';
  document.getElementById('litros').value = '';
}
