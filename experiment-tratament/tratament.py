def remove_lines_greater_than_100(file_path):
    # Lê o arquivo e armazena linhas válidas
    valid_lines = []
    
    with open(file_path, 'r') as file:
        for line in file:
            try:
                # Converte a linha para um número inteiro
                number = int(line.strip())
                # Adiciona a linha se o número for menor ou igual a 100
                if number <= 100:
                    valid_lines.append(line)
            except ValueError:
                print(f"Valor inválido encontrado na linha: {line.strip()}")

    # Grava as linhas válidas de volta no arquivo
    with open(file_path, 'w') as file:
        file.writelines(valid_lines)
remove_lines_greater_than_100("experiment_udp2.txt")
#soma_tcp = 0

# Abre o arquivo para leitura
#with open('experiment-tcp.txt', 'r') as arquivo:
    # Lê cada linha do arquivo
#    for linha in arquivo:
        # Converte a linha para um número e adiciona à soma
#        soma_tcp += float(linha.strip())  # Usando float para permitir valores decimais

# Exibe o resultado
#print(f'A soma dos valores é: {soma_tcp/300}')


soma_udp = 0

# Abre o arquivo para leitura
with open('experiment-udp.txt', 'r') as arquivo:
    # Lê cada linha do arquivo
    for linha in arquivo:
        # Converte a linha para um número e adiciona à soma
        soma_udp += float(linha.strip())  # Usando float para permitir valores decimais

# Exibe o resultado
print(f'A soma dos valores é: {soma_udp}')


# Exemplo de uso
#remove_lines_greater_than_100('experiment-udp.txt')


#import pandas as pd
#import matplotlib.pyplot as plt

#with open('experiment-tcp.txt', 'r') as arquivo:
    # Lê todas as linhas e remove espaços em branco
#    dados = [linha.strip() for linha in arquivo.readlines()]

# Converte os dados para inteiros
#dados = list(map(int, dados))

# Cria um novo DataFrame com duas colunas
# As linhas são organizadas em pares (x, y)
#dados_formatados = [(i, dados[i]) for i in range(0, len(dados))]

# Cria o DataFrame
#df = pd.DataFrame(dados_formatados, columns=['X', 'Y'])

# Salva o DataFrame em um arquivo CSV
#df.to_csv('dados_convertidos_tcp.csv', index=False)

#print('Arquivo CSV gerado com sucesso!')



#with open('experiment-udp.txt', 'r') as arquivo:
    # Lê todas as linhas e remove espaços em branco
#    dados = [linha.strip() for linha in arquivo.readlines()]

# Converte os dados para inteiros
#dados = list(map(int, dados))

# Cria um novo DataFrame com duas colunas
# As linhas são organizadas em pares (x, y)
#dados_formatados = [(i, dados[i]) for i in range(0, len(dados))]

# Cria o DataFrame
#df = pd.DataFrame(dados_formatados, columns=['X', 'Y'])

# Salva o DataFrame em um arquivo CSV
#df.to_csv('dados_convertidos_udp.csv', index=False)

#print('Arquivo CSV gerado com sucesso!')


# Ler os dados de cada arquivo
#data1 = pd.read_csv('dados_convertidos_tcp.csv')
#data2 = pd.read_csv('dados_convertidos_udp.csv')

# Criar o gráfico
#plt.figure(figsize=(10, 6))

# Plotar cada linha
#plt.plot(data1['X'], data1['Y'], label='TCP', marker='o')
#plt.plot(data2['X'], data2['Y'], label='UDP', marker='s')

# Adicionar rótulos e título
#plt.xlabel('Eixo X')
#plt.ylabel('Eixo Y')
#plt.title('Gráfico de Linhas')
#plt.legend()  # Adiciona a legenda
#plt.grid()    # Adiciona grade para melhor visualização

# Exibir o gráfico
#plt.tight_layout()
#plt.show()

# Lê os dados do arquivo original
#with open('experiment-tcp.txt', 'r') as arquivo:
    # Lê todas as linhas e remove espaços em branco
#    dados = [linha.strip() for linha in arquivo.readlines()]

# Converte os dados para inteiros
#dados = list(map(int, dados))

# Cria um novo DataFrame com duas colunas
# As linhas são organizadas em pares (x, y)
#dados_formatados = [(dados[i], dados[i + 1]) for i in range(0, len(dados) - 1, 2)]

# Cria o DataFrame
#df = pd.DataFrame(dados_formatados, columns=['Coluna1', 'Coluna2'])

# Salva o DataFrame em um arquivo CSV
#df.to_csv('dados_convertidos_tcp.csv', index=False)

#print('Arquivo CSV gerado com sucesso!')