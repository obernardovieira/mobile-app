import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import moment from 'moment';
import 'moment/locale/pt';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: {
        testnetWarning:
            "A friendly reminder you're using the Alfajores network build - the balances are not real.",
        pendingApprovalMessage:
            'This community is being reviewed. If you have any question please contact us at',
        pendingApproval: 'Pending Approval',
        fullDashboard: 'Full Dashboard',
        editCommunityDetails: 'Edit community details',
        viewAsPublic: 'View as public',
        share: 'Share',
        beneficiaries: 'Beneficiaries',
        backers: 'Backers',
        added: 'Added',
        removed: 'Removed',
        addBeneficiary: 'Add Beneficiary',
        add: 'Add',
        cancel: 'Cancel',
        claimed: 'Claimed',
        raised: 'Raised',
        claim: 'Claim',
        manage: 'Manage',
        communities: 'Communities',
        pay: 'Pay',
        wallet: 'Wallet',
        loginNow: 'Connect with Valora',
        editProfile: 'Edit Profile',
        balance: 'Balance',
        name: 'Name',
        currency: 'Currency',
        country: 'Country',
        phoneNumber: 'Phone Number',
        logout: 'Logout',
        recentTransactions: 'Recent Transactions',
        nameAddressPhone: 'Name, address or phone number',
        nameAddressPhoneNotFound: 'Name, address or phone number not found.',
        noteOptional: 'Note (optional)',
        recent: 'Recent',
        remove: 'Remove',
        beneficiaryAddress: 'Beneficiary Address',
        useText: 'Use Text',
        useCamera: 'Use Camera',
        tapToScanAgain: 'Tap to Scan Again',
        currentAddress: 'Current Address',
        allowCamera: 'Allow camera',
        moreAboutYourCommunity: 'More about your community',
        howClaimWorks: 'How claim works',
        upToPerBeneficiary: 'Up to ${{amount}} / beneficiary',
        ssi: 'Self-Sustainability Index',
        ssiDescription:
            'SSI indicates how self-sustainable a community is and how it progresses over time',
        seeMore: 'See More',
        seeLess: 'See Less',
        exploreCommunityContract: 'See Community Contract',
        edit: 'Edit',
        create: 'Create',
        submit: 'Submit',
        needLoginToCreateCommunity:
            'You need to connect with Valora to create a community.',
        communityDetails: 'Community Details',
        createCommunityDescription:
            'By creating a new community, you are initiating a new basic income mechanism for your community that enables any its beneficiary to get equal access to claim a recurring amount pre-defined by you in this form.',
        selectCoverImage: 'Select Cover Image',
        changeCoverImage: 'Change Cover Image',
        communityName: 'Community Name',
        shortDescription: 'Short Description',
        city: 'City',
        getGPSLocation: 'Get GPS Location',
        validCoordinates: 'Valid Coordinates',
        email: 'Email',
        contractDetails: 'Contract Details',
        claimAmount: 'Claim Amount',
        aroundValue: 'around {{symbol}}{{amount}}',
        totalClaimPerBeneficiary: 'Total claim amount per beneficiary',
        frequency: 'Frequency',
        hourly: 'Hourly',
        daily: 'Daily',
        weekly: 'Weekly',
        timeIncrementAfterClaim: 'Time increment after each claim (in minutes)',
        visibility: 'Visibility',
        public: 'Public',
        private: 'Private',
        createCommunityNote1:
            "Note: These parameters should be a minimum basic income that is sufficient to meet your beneficiaries' basic needs. They can claim while there are funds available in the contract. You will have the responsibility to promote your community and to raise funds for it.",
        createCommunityNote2:
            'If there is another person or organization among your community you believe is more suitable to drive this initiative, let them know about this possibility and encourage them to create a community.',
        failure: 'Failure',
        success: 'Success',
        requestNewCommunityPlaced:
            'Your request to create a new community was placed!',
        claimBiggerThanMax:
            'Claim Amount should not be bigger than Total claim amount per beneficiary!',
        claimNotZero: 'Claim Amount should not be zero!',
        maxNotZero: 'Total claim amount should not be zero!',
        communityUpdated: 'Your community was updated!',
        errorUpdatingCommunity:
            'An error happened while updating your community!',
        errorCreatingCommunity:
            'An error happened while placing the request to create a community!',
        anErroHappenedTryAgain: 'An error happened, please, try again.',
        toContinuePlease: 'To continue please',
        connectToYourCeloWallet: 'Connect with Valora',
        loginDescription1:
            'impactMarket operates on top of Celo network, an open and global financial platform.',
        loginDescription2:
            'With Valora you can easily send and receive money with just a mobile phone.',
        step1: 'Step 1',
        downloadCeloApp: 'Download Valora app',
        step2: 'Step 2',
        installCeloCreateAccount: 'Install Valora and create an account',
        finalStep: 'Final Step',
        connectCeloWallet: 'Connect with Valora',
        notNow: 'Not now',
        beforeMovingInsertPin:
            'Before moving any further, please, insert your PIN', // pin is for moving dude!
        pin4Digits: 'PIN (4 digits)',
        continue: 'Continue',
        yourQRCode: 'Your QR Code',
        scanToPay: 'Scan to Pay',
        showQRToScan: 'Show QR to be scanned',
        youHaveDonated: 'Thank you for your donation!',
        errorDonating: 'An error happened while donating!',
        addressCopiedClipboard: 'Community address copied to clipboard!',
        donate: 'Donate',
        donatingTo:
            'To support {{communityName}}, send only $cUSD (Celo Dollar) to this community contract address.',
        donateWithCelo: 'Donate with Valora',
        amountSymbol: 'Amount ({{symbol}})',
        close: 'Close',
        youCanClaimXin: 'You can claim {{symbol}}{{amount}} in',
        claimX: 'Claim {{symbol}}{{amount}}',
        loading: 'Loading...',
        youHaveClaimedXoutOfY: 'You have claimed ${{claimed}} out of ${{max}}',
        hour: 'hour',
        day: 'day',
        week: 'week',
        changePhoto: 'Change Photo',
        tryingToAddInvalidAddress: 'You are trying to add an invalid address!',
        errorSendingPayment: 'An error happened while sending the payment!',
        paymentSent: 'Payment sent!',
        scanningInvalidAddress: 'You are trying to scan an invalid address!',
        select: 'Select',
        errorGettingGPSLocation:
            'An error happened while getting the GPS location.',
        errorWhileLoadingRestart:
            'An error happened while loading. Please restart the app.',
        beneficiaryWasRemoved: '{{beneficiary}} was successfully removed!',
        errorRemovingBeneficiary:
            'An error happened while removing the beneficiary.',
        addedNewBeneficiary: "You've successfully added a new beneficiary!",
        addingInvalidAddress: 'You are trying to add an invalid address!',
        errorAddingBeneficiary:
            'An error happened while adding the beneficiary.',
        oneTimeWelcomeMessage1:
            'impactMarket enables any vulnerable community to create its own unconditional basic income system for their beneficiaries, where each member can claim a fixed amount on a regular basis and make payments for free',
        oneTimeWelcomeMessage2:
            'Back those beneficiaries by donating to their communities.',
        exploreCommunities: 'Explore Communities',
        noFunds: 'No Funds',
        notFundsToAddBeneficiary:
            'Your community does not has enough funds! You need at least 5 cents that will be sent to the beneficiary when added.',
        claimExplained1:
            'Each community has a group of beneficiaries, added by the coommunity managers, that can access a basic income under a set of rules defined at its creation.',
        claimExplained2:
            'For example, any beneficiary in a specific community can claim $1 cUSD from that community contract on a recurring basis with an interval of at least 24h before being able to claim another $1 cUSD, up to a cumulative total of $500 cUSD. Every time a beneficiary claims, the time interval to claim again can increase.',
        claimAmountHelp:
            'This is the UBI amount, is cUSD, that each beneficiary will be able to claim each time from this community contract. For example, each beneficiary can claim $2 from the contract on a regular basis, while there are funds available.',
        totalClaimPerBeneficiaryHelp:
            'This value is the limit each beneficiary can get in total after several claims. For example, each beneficiary can claim $2/day until it reaches a total of $1,000, meaning that each beneficiary will have access to a UBI ($2/day) for at least 16 months. This time can increase if minutes are added to the Time increment.',
        frequencyHelp:
            'Each beneficiary will be able to access a basic income on a regular basis, that can be daily or weekly. For example, if daily, each beneficiary will have to wait at least 1 day (24h) before being able to claim again (more $2).',
        timeIncrementAfterClaimHelp:
            'It is possible to add a time increment each time a beneficiary claims. For example, in a community where each beneficiary can claim $2/day, 20 minutes can be added to the time that that beneficiary will have to wait before being able to claim again (in this case, 24h20m after claiming for the 2nd time, 24h40m after the 3rd time, and so on). This benefits those who claimed less and incentivizes self-sustainability progress.',
        coverImageRequired: 'Cover image is required!',
        communityNameRequired: 'Comunity name is required!',
        communityDescriptionRequired: 'Comunity description is required!',
        cityRequired: 'City is required!',
        countryRequired: 'Country is required!',
        enablingGPSRequired: 'Enabling GPS is required!',
        emailRequired: 'Email address is invalid!',
        claimAmountRequired: 'Claim amount is required!',
        maxClaimAmountRequired: 'Max claim amount is required!',
        incrementalIntervalRequired: 'Incremental interval is required!',
        turnOn: 'Turn On',
        turnOnLocationHint: 'Turn on your location for a better experience',
        tryAgain: 'Try Again',
    },
    pt: {
        testnetWarning:
            'Lembre-se que está a usar a testnet Alfajores - os balanços não são reais.',
        pendingApprovalMessage:
            'Esta comunidade ainda não foi aprovada. Alguma questão, contacte-nos',
        pendingApproval: 'Pedido Pendente',
        fullDashboard: 'Painel Completo',
        editCommunityDetails: 'Editar detalhes da comunidade',
        viewAsPublic: 'Ver página da comunidade',
        share: 'Partilhar',
        beneficiaries: 'Beneficiários',
        backers: 'Apoiantes',
        added: 'Adicionado',
        removed: 'Removido',
        addBeneficiary: 'Adicionar Beneficiário',
        add: 'Adicionar',
        cancel: 'Cancelar',
        claimed: 'Distribuído',
        raised: 'Angariado',
        claim: 'Pedir',
        manage: 'Gerir',
        communities: 'Comunidades',
        pay: 'Pagar',
        wallet: 'Carteira',
        loginNow: 'Conectar Agora',
        editProfile: 'Editar Perfil',
        balance: 'Balanço',
        name: 'Nome',
        currency: 'Moeda',
        country: 'País',
        phoneNumber: 'Número de telemóvel',
        logout: 'Sair',
        recentTransactions: 'Transações Recentes',
        nameAddressPhone: 'Nome, endereço ou número de telemóvel',
        nameAddressPhoneNotFound:
            'Nome, endereço ou número de telemóvel não encontrado.',
        noteOptional: 'Nota (opcional)',
        recent: 'Recente',
        remove: 'Remover',
        beneficiaryAddress: 'Endereço do Beneficiário',
        useText: 'Usar Texto',
        useCamera: 'Usar Camera',
        tapToScanAgain: 'Clique para tentar de novo',
        currentAddress: 'Endereço Atual',
        allowCamera: 'Permitir camera',
        moreAboutYourCommunity: 'Mais sobre a sua comunidade',
        howClaimWorks: 'Como funcionam os pedidos',
        upToPerBeneficiary: 'Até ${{amount}} / beneficiário',
        ssi: 'Indice de Auto Sustentabilidade',
        ssiDescription:
            'O SSI indica o quão auto-sustentável é uma comunidade e como ela progride ao longo do tempo',
        seeMore: 'Ver Mais',
        seeLess: 'Ver Menos',
        exploreCommunityContract: 'Ver Contrato da Comunidade',
        edit: 'Editar',
        create: 'Criar',
        submit: 'Enviar',
        needLoginToCreateCommunity:
            'É necessário estar conectado com a app Valora para criar uma comunidade.',
        communityDetails: 'Detalhes da Comunidade',
        createCommunityDescription:
            'Ao criar uma comunidade, um novo contrato de renda mínima é iniciado, onde todos os beneficiários adicionados terão acesso igual aos fundos nesse contrato, de forma regular.',
        selectCoverImage: 'Selecione Imagem de Capa',
        changeCoverImage: 'Altere a Imagem de Capa',
        communityName: 'Nome da Comunidade',
        shortDescription: 'Descrição',
        city: 'Cidade',
        getGPSLocation: 'Obter Localização GPS',
        validCoordinates: 'Coordenadas Validas',
        email: 'Email',
        contractDetails: 'Detalhes do Contrato',
        claimAmount: 'Montante por Pedido',
        aroundValue: '~ {{symbol}}{{amount}}',
        totalClaimPerBeneficiary: 'Montante total por beneficiário',
        frequency: 'Frequência',
        hourly: 'Por Hora',
        daily: 'Diariamente',
        weekly: 'Semanalmente',
        timeIncrementAfterClaim:
            'Incremento de tempo após cada pedido (em minutos)',
        visibility: 'Visibilidade',
        public: 'Publico',
        private: 'Privado',
        createCommunityNote1:
            'Nota: Esses valores devem ser uma renda básica mínima suficiente para atender às necessidades básicas dos seus beneficiários. Quem cria a comunidade tem a responsabilidade de a promover, gerir e angariar fundos.',
        createCommunityNote2:
            'Se existir outra pessoa ou organização social na sua comunidade que seja mais adequada para gerir esta iniciativa, informe sobre esta possibilidade e incentive a criar uma comunidade.',
        failure: 'Falhou',
        success: 'Sucesso',
        requestNewCommunityPlaced:
            'O seu pedido para criar uma nova comunidade foi registado! Validação a decorrer.',
        claimBiggerThanMax:
            'O valor por pedido deve ser inferior ao valor total!',
        claimNotZero: 'Montante por Pedido deve ser superior a zero!',
        maxNotZero: 'Montante total por beneficiário deve ser superior a zero!',
        communityUpdated: 'Os dados da comunidade foram atualizados!',
        errorUpdatingCommunity:
            'Ocorreu um erro enquanto atualizava os dados da comunidade!',
        errorCreatingCommunity:
            'Ocorreu um erro enquanto era registado o pedido para criar uma comunidade!',
        anErroHappenedTryAgain: 'Ocorreu um erro, por favor, tente novamente!',
        toContinuePlease: 'Para continuar, deverá',
        connectToYourCeloWallet: 'Conectar com Valora',
        loginDescription1:
            'impactMarket opera na rede Celo, um sistema financeiro aberto focado em criar prosperidade para todos.',
        loginDescription2:
            'Com a carteira Valora, pode enviar e receber dinheiro usando apenas um telemóvel.',
        step1: 'Passo 1',
        downloadCeloApp: 'Descarregue a carteira Valora',
        step2: 'Passo 2',
        installCeloCreateAccount: 'Instale a carteira e crie uma conta',
        finalStep: 'Último Passo',
        connectCeloWallet: 'Conectar com Valora',
        notNow: 'Agora não',
        beforeMovingInsertPin: 'Antes de continuar, por favor, introduza o PIN',
        pin4Digits: 'PIN (4 digitos)',
        continue: 'Continuar',
        yourQRCode: 'Seu código QR',
        scanToPay: 'Scan para Pagar',
        showQRToScan: 'Mostrar código QR',
        youHaveDonated: 'Obrigado pelo seu donativo!',
        errorDonating: 'Um erro ocorreu durante o donativo!',
        addressCopiedClipboard: 'Endereço da comunidade copiado!',
        donate: 'Contribuir',
        donatingTo:
            'Para apoiar a comunidade {{communityName}}, envie apenas $cUSD (Celo Dollar) para este endereço do contrato da comunidade.',
        donateWithCelo: 'Doar com Valora',
        amountSymbol: 'Montante em {{symbol}}',
        close: 'Fechar',
        youCanClaimXin: 'Poderá pedir {{symbol}}{{amount}} em',
        claimX: 'Pedir {{symbol}}{{amount}}',
        loading: 'A carregar...',
        youHaveClaimedXoutOfY: 'Já recebeu ${{claimed}} em ${{max}}',
        hour: 'hora',
        day: 'dia',
        week: 'semana',
        changePhoto: 'Alterar foto',
        scanningInvalidAddress: 'Esse endereço parece inválido!',
        select: 'Selecionar',
        errorGettingGPSLocation: 'Ocorreu um erro ao obter a localização GPS.',
        errorWhileLoadingRestart:
            'Ocorreu eu erro ao iniciar. Por favor reinicie.',
        beneficiaryWasRemoved: '{{beneficiary}} foi removido com sucesso!',
        errorRemovingBeneficiary:
            'Ocorreu um erro enquanto removia o beneficiário.',
        addedNewBeneficiary: 'Um novo beneficiário foi adicionado com sucesso!',
        addingInvalidAddress: 'Está a tentar adicionar um endereço inválido!',
        errorAddingBeneficiary: 'Ocorreu um erro ao adicionar o beneficiário.',
        oneTimeWelcomeMessage1:
            'impactMarket é um sistema de renda básica, que permite que qualquer comunidade crie o seu próprio sistema de distribuição de rendimento entre os seus beneficiários, de forma independente e decentralizada',
        oneTimeWelcomeMessage2:
            'Pode apoiar esses beneficiários doando para suas comunidades.',
        exploreCommunities: 'Explorar Comunidades',
        noFunds: 'Fundos Insuficientes',
        notFundsToAddBeneficiary:
            'A comunidade não tem fundos suficientes! $0.05 serão enviados ao beneficiário quando adicionado.',
        claimExplained1:
            'Cada comunidade possui um grupo de beneficiários, adicionados pelos gestores da comunidade, que podem aceder um rendimento mínimo, de acordo com um conjunto de regras definidas quando criada.',
        claimExplained2:
            'Por exemplo, qualquer beneficiário em uma comunidade específica pode reivindicar/pedir $1 cUSD desse contrato comunitário, de forma recorrente, com um intervalo de pelo menos 24 horas antes de poder pedir outro $1 cUSD, até um total acumulado de $500 cUSD. Cada vez que um beneficiário pede $1 cUSD, o intervalo de tempo para pedir novamente pode aumentar.',
        claimAmountHelp:
            'Este é o montante UBI, em $cUSD (dólar americano), que cada beneficiário poderá reivindicar/pedir de cada vez deste contrato comunitário. Por exemplo, cada beneficiário pode reivindicar $2 do contrato regularmente, enquanto tiver fundos disponíveis.',
        totalClaimPerBeneficiaryHelp:
            'Este montante é o limite que cada beneficiário pode obter no total após várias pedidos. Por exemplo, cada beneficiário pode pedir $2 por dia até atingir um total de $1000, o que significa que cada beneficiário terá acesso a um rendimento mínimo de $2/dia durante pelo menos 16 meses. Este tempo pode aumentar se a opção de incremento de tempo dessa comunidade for superior a zero.',
        frequencyHelp:
            'Cada beneficiário terá acesso a uma renda básica de forma regular, que pode ser diária ou semanal. Por exemplo, se for diário, cada beneficiário terá que esperar pelo menos 1 dia (24h) antes de poder pedir novamente (mais $2).',
        timeIncrementAfterClaimHelp:
            'É possível adicionar um incremento de tempo cada vez que um beneficiário reclama. Por exemplo, numa comunidade onde cada beneficiário pode pedir $2/dia, 20 minutos podem ser adicionados ao tempo que esse beneficiário terá que esperar antes de poder pedir novamente (neste caso, 24h20m após pedir pela 2ª vez, 24h40m após a 3ª vez, e assim por diante). Isto beneficia quem pede menos e incentiva uma transição para auto-sustentabilidade.',
        coverImageRequired: 'Imagem de capa é obrigatório!',
        communityNameRequired: 'Nome da comunidade é obrigatório!',
        communityDescriptionRequired: 'Descrição da comunidade é obrigatório!',
        cityRequired: 'Cidade é obrigatório!',
        countryRequired: 'País é obrigatório!',
        enablingGPSRequired: 'Ativar o GPS é obrigatório!',
        emailRequired: 'Endereço de e-mail é obrigatório!',
        claimAmountRequired: 'Quantidade a pedir é obrigatório!',
        maxClaimAmountRequired: 'Quantidade máxima a pedir é obrigatório!',
        incrementalIntervalRequired: 'Intervalo de incremento é obrigatório!',
        turnOn: 'Ativar',
        turnOnLocationHint: 'Ative a sua localização para uma melhor experiência.',
        tryAgain: 'Tentar Novamente',
    },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
moment.locale(Localization.locale);
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default i18n;
