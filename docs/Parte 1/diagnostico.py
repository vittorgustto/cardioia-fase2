# -*- coding: utf-8 -*-
"""Diagnóstico definitivo baseado em mapa de conhecimento.
Todos os sintomas e diagnósticos serão separados apenas por ';', sem tabs ou múltiplos espaços.
"""

import csv, unicodedata, pathlib
from collections import defaultdict

def normalize(text):
    """Normaliza texto apenas para busca, mantendo acentos para exibição."""
    text_lower = text.lower()
    text_norm = unicodedata.normalize("NFD", text_lower)
    return "".join(ch for ch in text_norm if not unicodedata.combining(ch))

# Caminhos dos arquivos
base = pathlib.Path(__file__).resolve().parent
frases_path = base / "sintomas.txt"
mapa_path = base / "mapa_conhecimento.csv"
saida_path = base / "resultados_diagnostico.csv"

# Carregar frases
frases = [l.strip() for l in frases_path.read_text(encoding="utf-8").splitlines() if l.strip()]

# Carregar mapa de conhecimento
mapeamentos = []
with mapa_path.open(encoding="utf-8-sig") as f:
    r = csv.DictReader(f)
    for row in r:
        mapeamentos.append({
            'sintoma1': row['sintoma1'],
            'sintoma2': row['sintoma2'],
            'doenca_associada': row['doenca_associada']
        })

# Processar frases
resultados = []
for i, frase in enumerate(frases, start=1):
    f_norm = normalize(frase)
    sugestoes = defaultdict(int)
    sintomas_detectados = set()

    for m in mapeamentos:
        s1_norm = normalize(m['sintoma1'])
        s2_norm = normalize(m['sintoma2'])
        count = 0
        if s1_norm in f_norm:
            sintomas_detectados.add(m['sintoma1'])
            count += 1
        if s2_norm in f_norm:
            sintomas_detectados.add(m['sintoma2'])
            count += 1
        if count > 0:
            sugestoes[m['doenca_associada']] += count

    # Caso especial: dor no peito + ansiedade
    if not sugestoes and 'dor no peito' in f_norm and 'ansiedade' in f_norm:
        sugestoes['Dor torácica não cardíaca'] = 2
        sintomas_detectados.update(['dor no peito','ansiedade'])

    # Diagnóstico padrão se nada foi detectado
    if not sugestoes:
        sugestoes['Monitorar sintomas; Avaliar em hospital'] = 1

    # Ordenar diagnósticos por quantidade de sintomas detectados
    diagn_sorted = [k for k, v in sorted(sugestoes.items(), key=lambda item: item[1], reverse=True)]

    resultados.append({
        'id_frase': i,
        'frase': frase,
        'sintomas_detectados': '; '.join(sorted(sintomas_detectados)) if sintomas_detectados else '-',
        'diagnosticos_sugeridos': '; '.join(diagn_sorted)
    })

# Escrever CSV de saída (com separador ;)
with saida_path.open('w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(
        f, 
        fieldnames=['id_frase','frase','sintomas_detectados','diagnosticos_sugeridos'],
        delimiter=';'  # <- separador correto para Excel PT-BR
    )
    w.writeheader()
    for row in resultados:
        # Substituir tabs, múltiplos espaços ou vírgulas indesejadas por ';'
        row['sintomas_detectados'] = '; '.join([s.strip() for s in row['sintomas_detectados'].replace('\t', ';').split(';') if s.strip()])
        row['diagnosticos_sugeridos'] = '; '.join([d.strip() for d in row['diagnosticos_sugeridos'].replace('\t', ';').split(';') if d.strip()])
        w.writerow(row)

print(f"Análise concluída. Resultados em: {saida_path}")
