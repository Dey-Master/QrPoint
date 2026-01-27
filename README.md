# # QRPOINT – Sistema de Presença com QR Code

QRPresence é uma plataforma web desenvolvida com HTML, CSS, JavaScript e Node.js, destinada a simplificar o registro de presença em instituições como escolas, empresas ou qualquer organização que precise controlar entradas e saídas. O sistema centraliza o registro de presença, cálculo de atrasos e faltas, histórico de usuários e relatórios administrativos, garantindo maior eficiência, precisão e transparência.

## Principais Funcionalidades

- **Gestão de usuários:** Usuário Comum, Moderadores e o Administrador (ADM)  
- **Registro e autenticação via email** com aprovação pelo ADM  ou Moderadores
- **Controle de presença por QR Code**: registro automático de entrada e saída  
- **Cálculo de atraso e status de presença**: pontual, atrasado ou falta  
- **Visualização de histórico** diário, semanal ou mensal  
- **Marcação de faltas automáticas pelo sistema**  
- **Painel administrativo completo:** criação de QR Codes, aprovação de usuários e Visualização de presenças
- **Notificações e confirmações** no front-end após scan  
- **Segurança:** tokens únicos para QR Codes e autenticação com sessão

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Banco de Dados:** MySQL  
- **QR Code:** compatível com qualquer app de leitura de QR  

## Objetivo

Oferecer uma solução prática e inteligente para registro de presença, permitindo que usuários registrem automaticamente suas entradas e saídas através de QR Codes, enquanto o ADM mantém controle total sobre presenças, atrasos e relatórios. O sistema proporciona maior organização, confiabilidade e rapidez nos processos de controle de presença.

## Estrutura do Projeto

- `/frontend` – código do html/css e JavaScript 
- `/backend` – rotas e lógica do Node.js  
- `/database` – scripts de criação e inicialização do MySQL  
