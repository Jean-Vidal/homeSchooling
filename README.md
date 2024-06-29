
# Bem-vindo ao seu aplicativo Expo 👋

Este é um projeto [Expo](https://expo.dev) criado com [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Visão Geral do Projeto

Este projeto visa desenvolver uma solução completa de software para gerenciar atividades de homeschooling. Inclui funcionalidades para planejar estudos, armazenar atividades educacionais e gerar métricas de desempenho para ajudar as famílias a gerenciar a educação domiciliar de forma eficiente.

### Principais Funcionalidades
- **Autenticação de Usuário**: Autenticação Firebase para login seguro.
- **Gerenciamento de Atividades**: Componentes para adicionar e gerenciar atividades educacionais, incluindo captura de fotos e upload de documentos.
- **Métricas de Desempenho**: Dashboard com gráficos de pizza mostrando atividades concluídas e pendentes.
- **Manipulação de Arquivos**: Importação e exportação de arquivos em diversos formatos.
- **Compatibilidade Cross-Platform**: Desenvolvido usando React Native, compatível com Android e iOS.

## Como começar

1. Instale as dependências

   ```bash
   npm install
   ```

2. Inicie o aplicativo

   ```bash
   npx expo start
   ```

Na saída, você encontrará opções para abrir o aplicativo em um

- [build de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/)
- [emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [simulador iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), um sandbox limitado para experimentar o desenvolvimento de aplicativos com Expo

Você pode começar a desenvolver editando os arquivos dentro do diretório **app**. Este projeto utiliza [roteamento baseado em arquivos](https://docs.expo.dev/router/introduction).

## Configuração do Firebase

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Serviços Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
```

## Funcionalidades do Projeto

### Autenticação
Implementado usando Firebase Authentication para login seguro.

### Gerenciamento de Atividades
- **ArmazenarAtividades**: Permite aos usuários tirar fotos e fazer upload de documentos.
- **Table**: Exibe uma tabela de tarefas com opções para editar e excluir.
- **Dashboard**: Exibe um gráfico de pizza de tarefas pendentes e concluídas.

### Métricas de Desempenho
Usa `react-native-chart-kit` para exibir métricas de desempenho em gráficos de pizza.

### Manipulação de Arquivos
- **react-native-image-picker**: Para capturar fotos.
- **react-native-document-picker**: Para selecionar documentos.

### Compatibilidade Cross-Platform
Desenvolvido usando React Native e Expo, garantindo compatibilidade com Android e iOS.

## Obter um projeto novo

Quando estiver pronto, execute:

```bash
npm run reset-project
```

Este comando moverá o código inicial para o diretório **app-example** e criará um diretório **app** em branco onde você pode começar a desenvolver.

## Saiba mais

Para saber mais sobre o desenvolvimento do seu projeto com Expo, consulte os seguintes recursos:

- [Documentação do Expo](https://docs.expo.dev/): Aprenda os fundamentos ou explore tópicos avançados com nossos [guias](https://docs.expo.dev/guides).
- [Tutorial do Expo](https://docs.expo.dev/tutorial/introduction/): Siga um tutorial passo a passo onde você criará um projeto que roda em Android, iOS e na web.

## Junte-se à comunidade

Junte-se à nossa comunidade de desenvolvedores criando aplicativos universais.

- [Expo no GitHub](https://github.com/expo/expo): Veja nossa plataforma de código aberto e contribua.
- [Comunidade no Discord](https://chat.expo.dev): Converse com usuários do Expo e tire suas dúvidas.
