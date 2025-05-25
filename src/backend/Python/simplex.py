import numpy as np
import sys
import json

# Function to read JSON data from a file
def read_json_stdin():
    input_data = sys.stdin.read()
    return json.loads(input_data)

# Função main
def simplex():
    # Read JSON from stdin
    data = read_json_stdin()

    # Extrair variáveis do arquivo JSON
    modo = data["modo"]
    qtd_var_obj = data["qtd_var_obj"]
    qtd_res_des = data["qtd_res_des"]
    matriz = data["matriz"]

    if isinstance(matriz, str):
        matriz = json.loads(matriz)

    matriz = np.array(matriz, dtype=float)

    # Criar lista de variáveis para o output
    lista_var = []

    for i in range(min(qtd_res_des, qtd_var_obj)+1, (qtd_var_obj + qtd_res_des)+1):
        lista_var.append(i)

    lista_var = np.array(lista_var)

    #
    # Fazendo cálculos
    #

    # Pegando tamanho da linha e da coluna
    qtd_linha = len(matriz)
    qtd_coluna = len(matriz[0])

    # Pegando a última linha da matriz
    ultima_linha = matriz[qtd_linha-1]

    # Verificando se o problema é de minimização ou maximização
    if modo == "minimização":
        # Multiplicando a última linha por -1
        for i in range(qtd_coluna):
            ultima_linha[i] = ultima_linha[i] * -1

    while len([*filter(lambda x: x < 0, ultima_linha)]) > 0:
        menor = min(ultima_linha)
        
        for i in range(qtd_coluna): 
            if ultima_linha[i] == menor:
                coluna_pivo = i
        
        aux_m = 2 * sys.maxsize + 1
        linha_pivo = -1
            
        for i in range(qtd_linha-1):
            e = matriz[i][coluna_pivo]
            
            if e != 0:
                f = matriz[i][qtd_coluna-1] / e
            
                if f < aux_m:
                    aux_m = f
                    linha_pivo = i
                        
        lista_var[linha_pivo] = coluna_pivo + 1
        
        matriz[linha_pivo] = matriz[linha_pivo] / matriz[linha_pivo][coluna_pivo]
        
        for i in range(qtd_linha):
            if i != linha_pivo:
                matriz[i] = matriz[i] - (matriz[i][coluna_pivo] * matriz[linha_pivo])

    # Organizando output
    output = []
    for i in range(len(lista_var)):
        output.append(f"x{lista_var[i]} = {matriz[i][qtd_coluna-1]}")

    output.append(f"z = {matriz[qtd_linha-1][qtd_coluna-1]}")

    print(json.dumps(output))

if __name__ == "__main__":
    simplex()