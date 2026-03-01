import React, { useState, useEffect } from 'react';
import { Play, VolumeX } from 'lucide-react';

type StepType = 'start' | 'question_image' | 'question_emoji' | 'audio_message' | 'testimonials' | 'loading' | 'final_video';

interface Step {
  type: StepType;
  preTitle?: string;
  title: string;
  image?: string;
  buttonText?: string;
  footerText?: string;
  footerVerse?: string;
  options?: { text: string; image?: string; emoji?: string }[];
  videos?: string[];
  video?: string;
}

const steps: Step[] = [
  {
    type: 'start',
    preTitle: 'Essa é a resposta que você pediu em oração.',
    title: 'Descubra qual mensagem o Arcanjo Miguel tem para sua vida hoje.',
    image: '/archangel.jpg', // Angel placeholder
    buttonText: 'Descobrir agora',
    footerText: 'Por isso digo: Peçam, e será dado; busquem, e encontrarão; batam, e a porta será aberta.',
    footerVerse: 'Lucas 11:9'
  },
  {
    type: 'question_image',
    title: 'Se você pudesse pedir uma intervenção urgente do Arcanjo Miguel hoje, para qual área seria?',
    options: [
      { text: 'Proteção para minha família', image: '/family.jpg' },
      { text: 'Desbloqueio financeiro', image: '/finance.jpg' },
      { text: 'Chuva de bençãos', image: '/blessings.jpg' },
      { text: 'Quebra do mal e das tentações', image: '/breaking_evil.jpg' },
    ]
  },
  {
    type: 'question_emoji',
    title: 'Como está sua relação com o dinheiro hoje?',
    options: [
      { text: 'O dinheiro entra e sai mas nunca sobra nada..', emoji: '💸' },
      { text: 'Estou afogado em dívidas..', emoji: '😰' },
      { text: 'Tenho apenas o básico.. mas sinto que mereço e posso muito mais.', emoji: '😐' },
      { text: 'Estou no fundo do poço.. desempregado e sem perspectiva alguma.', emoji: '😭' },
    ]
  },
  {
    type: 'question_emoji',
    title: 'Você sente que, por mais que se esforce as coisas não melhoram?',
    options: [
      { text: 'Faço tudo que está ao meu alcance mas as coisas parecem que nunca dão certo pra mim..', emoji: '🤯' },
      { text: 'Muitas vezes sim..', emoji: '😓' },
      { text: 'As coisas estão melhorando.. mas sinto que preciso de uma ajuda superior..', emoji: '🙂' },
      { text: 'Agora sei que estou no caminho certo e que tudo vai prosperar..', emoji: '😌' },
    ]
  },
  {
    type: 'question_emoji',
    title: 'Você teme pela segurança de alguém que você ama?',
    options: [
      { text: 'Meus filhos', emoji: '👨‍👩‍👧‍👦' },
      { text: 'Meu cônjuge, parceiro(a)', emoji: '👫' },
      { text: 'Meus pais.. familiares..', emoji: '👪' },
      { text: 'Muitas pessoas próximas dependem de mim..', emoji: '😔' },
    ]
  },
  {
    type: 'question_emoji',
    title: 'Você acredita que existem pessoas que te invejam ou te desejam mal?',
    options: [
      { text: 'Sim.. e sei exatamente quem são', emoji: '🚪' },
      { text: 'Eu sinto que sim.. e isso atrapalha minha vida. Mas não sei quem são', emoji: '❌' },
      { text: 'Deus tem me falado para me afastar de certas pessoas..', emoji: '🙏' },
      { text: 'Não posso afirmar..', emoji: '😑' },
    ]
  },
  {
    type: 'question_emoji',
    title: 'Nos últimos dias ou semanas, você teve algum desses sinais?',
    options: [
      { text: 'Sonhos estranhos e muito vívidos..', emoji: '💤' },
      { text: 'Acordar de madrugada sem motivo e não conseguir voltar a dormir..', emoji: '😥' },
      { text: 'Sensação de algo está tentando te avisar..', emoji: '💬' },
      { text: 'Coincidências e sincronicidades', emoji: '🌀' },
    ]
  },
  {
    type: 'audio_message',
    title: 'Nada disso é coincidência..\nDeus tem preparado algo grandioso para transformar a sua vida.\nE mandou Miguel para te instruir..',
    buttonText: 'Continuar'
  },
  {
    type: 'question_emoji',
    title: 'Você está disposto(a) a seguir as orientações sagradas para receber suas bênçãos?',
    options: [
      { text: 'Com toda certeza sim.. farei tudo que for preciso!!!', emoji: '🤗' },
      { text: 'Sim.. estou pronto para mudar de vida!!!!', emoji: '🥰' },
      { text: 'Esperei muito por esse momento..', emoji: '😊' },
      { text: 'Sim.. não aguento mais sofrer', emoji: '😔' },
    ]
  },
  {
    type: 'question_emoji',
    title: 'Se você receber a Oração do Arcanjo Miguel, você se compromete a fazê-la com fé?',
    options: [
      { text: 'Sim.. prometo fazer diariamente', emoji: '🙏' },
      { text: 'Estou aprendendo a criar intimidade com o Senhor, mas farei o que for necessário', emoji: '🚪' },
      { text: 'Não sei se tenho tempo..', emoji: '😟' },
    ]
  },
  {
    type: 'question_emoji',
    title: 'Você está pronto(a) para receber suas bênçãos AGORA?',
    options: [
      { text: 'Sim..', emoji: '😃' },
      { text: 'Com certeza..', emoji: '🤩' },
    ]
  },
  {
    type: 'testimonials',
    title: 'Muitas pessoas também duvidaram no começo. Até fazerem a oração e perceberem que <span class="text-red-600 font-bold">não era uma oração comum</span> e começaram a relatar isso:',
    videos: [
      '/testimonial1.jpg',
      '/testimonial2.jpg'
    ],
    buttonText: 'Continuar'
  },
  {
    type: 'loading',
    title: 'Carregando a sua oração..',
    image: '/archangel.jpg'
  },
  {
    type: 'final_video',
    title: 'Parabéns!\nEntre milhares... você foi um dos selecionados.\nA Oração Secreta do Arcanjo Miguel foi liberada para você HOJE!',
    video: '/archangel.jpg'
  }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const step = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (step.type === 'loading') {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => nextStep(), 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [currentStep, step.type]);

  const renderProgressBar = () => {
    if (step.type === 'start' || step.type === 'final_video') return null;
    
    // Calculate progress based on total steps, excluding start and final
    const progressSteps = steps.length - 2;
    const currentProgressStep = currentStep > 0 ? currentStep : 0;
    const progressPercentage = Math.min(100, (currentProgressStep / progressSteps) * 100);

    return (
      <div className="w-full bg-[#e6f2f9] h-2.5 rounded-full mb-8 mt-2">
        <div 
          className="bg-[#0078c8] h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };

  const renderContent = () => {
    switch (step.type) {
      case 'start':
        return (
          <div className="text-center animate-in fade-in duration-500">
            {step.preTitle && (
              <div className="bg-[#f0f7ff] text-[#0078c8] font-bold py-3 px-4 rounded-2xl mb-6 text-sm">
                {step.preTitle}
              </div>
            )}
            <h1 className="text-[22px] font-bold text-[#0078c8] mb-6 leading-snug">
              {step.title}
            </h1>
            {step.image && (
              <img src={step.image} alt="Arcanjo Miguel" className="w-full rounded-2xl mb-6 shadow-md object-cover aspect-square" />
            )}
            <button 
              onClick={nextStep} 
              className="w-full bg-[#0078c8] hover:bg-[#0060a0] text-white font-bold py-4 rounded-2xl text-lg shadow-[0_4px_14px_0_rgba(0,120,200,0.39)] mb-8 transition-all active:scale-95"
            >
              {step.buttonText}
            </button>
            <p className="text-gray-500 text-sm px-4 leading-relaxed">
              {step.footerText}
              <br /><br />
              {step.footerVerse}
            </p>
          </div>
        );

      case 'question_image':
        return (
          <div className="text-center animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-[22px] font-bold text-[#0078c8] mb-8 leading-snug px-2">
              {step.title}
            </h2>
            <div className="space-y-4">
              {step.options?.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={nextStep} 
                  className="w-full flex items-center bg-[#f4f9fd] border-2 border-[#b8dcf9] rounded-2xl overflow-hidden hover:border-[#0078c8] transition-all text-left relative group active:scale-[0.98]"
                >
                  <img src={opt.image} alt={opt.text} className="w-[88px] h-[88px] object-cover" />
                  <span className="flex-1 px-4 font-bold text-[#0078c8] text-[15px] leading-tight">{opt.text}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-[#b8dcf9] mr-4 group-hover:border-[#0078c8] flex-shrink-0"></div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'question_emoji':
        return (
          <div className="text-center animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-[22px] font-bold text-[#0078c8] mb-8 leading-snug px-2">
              {step.title}
            </h2>
            <div className="space-y-4">
              {step.options?.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={nextStep} 
                  className="w-full flex items-center bg-[#f4f9fd] border-2 border-[#b8dcf9] rounded-2xl p-4 hover:border-[#0078c8] transition-all text-left group active:scale-[0.98]"
                >
                  <span className="text-3xl mr-4 flex-shrink-0">{opt.emoji}</span>
                  <span className="flex-1 font-semibold text-[#0078c8] text-[15px] leading-tight">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'audio_message':
        return (
          <div className="text-center animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-[22px] font-bold text-[#0078c8] mb-8 leading-snug whitespace-pre-line px-2">
              {step.title}
            </h2>
            <div className="bg-[#f2efe9] rounded-2xl p-4 mb-8 flex items-center shadow-sm">
               <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0">
                 <Play size={20} fill="currentColor" className="ml-1" />
               </div>
               <div className="flex-1">
                 <div className="h-6 flex items-center space-x-[2px] overflow-hidden">
                   {[...Array(30)].map((_, i) => (
                     <div key={i} className="w-1 bg-gray-300 rounded-full" style={{ height: `${Math.max(20, Math.random() * 100)}%` }}></div>
                   ))}
                 </div>
                 <div className="text-[11px] text-gray-500 text-left mt-1 font-medium">00:45</div>
               </div>
               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="Avatar" className="w-12 h-12 rounded-full ml-3 border-2 border-white object-cover flex-shrink-0" />
            </div>
            <button 
              onClick={nextStep} 
              className="w-full bg-[#0078c8] hover:bg-[#0060a0] text-white font-bold py-4 rounded-2xl text-lg shadow-[0_4px_14px_0_rgba(0,120,200,0.39)] transition-all active:scale-95"
            >
              {step.buttonText}
            </button>
          </div>
        );

      case 'testimonials':
        return (
          <div className="text-center animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 
              className="text-[19px] font-bold text-black mb-8 leading-snug px-2" 
              dangerouslySetInnerHTML={{ __html: step.title }}
            />
            <div className="space-y-6 mb-8">
              {step.videos?.map((vid, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-gray-200 shadow-md">
                  <img src={vid} alt="Testimonial" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="bg-[#1a56db]/90 text-white px-6 py-4 rounded-xl flex flex-col items-center shadow-lg backdrop-blur-sm">
                      <span className="text-[11px] font-bold mb-2 tracking-wide uppercase">Seu vídeo já começou</span>
                      <VolumeX size={36} strokeWidth={1.5} />
                      <span className="text-[11px] font-bold mt-2 tracking-wide uppercase">Clique para ouvir</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={nextStep} 
              className="w-full bg-[#0078c8] hover:bg-[#0060a0] text-white font-bold py-4 rounded-2xl text-lg shadow-[0_4px_14px_0_rgba(0,120,200,0.39)] transition-all active:scale-95"
            >
              {step.buttonText}
            </button>
          </div>
        );

      case 'loading':
        return (
          <div className="text-center flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
            {step.image && (
              <img src={step.image} alt="Loading" className="w-full rounded-2xl mb-8 shadow-md object-cover aspect-[4/3]" />
            )}
            <div className="w-full flex justify-between text-[13px] font-bold text-[#0078c8] mb-2 px-1">
              <span>{step.title}</span>
              <span>{loadingProgress}%</span>
            </div>
            <div className="w-full bg-[#e6f2f9] h-2.5 rounded-full mb-4">
              <div 
                className="bg-[#0078c8] h-2.5 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-500 text-sm">Aguarde um momento..</p>
          </div>
        );

      case 'final_video':
        return (
          <div className="text-center animate-in zoom-in-95 fade-in duration-700">
            <h2 className="text-[20px] font-bold text-[#0078c8] mb-6 leading-snug whitespace-pre-line px-2">
              {step.title}
            </h2>
            <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-gray-200 shadow-2xl">
              {step.video && (
                <img src={step.video} alt="Final Video" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="bg-[#1a56db]/90 text-white px-8 py-5 rounded-2xl flex flex-col items-center shadow-xl backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform">
                  <span className="text-xs font-bold mb-3 tracking-wider uppercase">Seu vídeo já começou</span>
                  <VolumeX size={48} strokeWidth={1.5} />
                  <span className="text-xs font-bold mt-3 tracking-wider uppercase">Clique para ouvir</span>
                </div>
              </div>
              <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                <span className="bg-black/60 backdrop-blur-md text-white font-black text-xl px-6 py-2 rounded-lg tracking-wide shadow-lg">
                  AINDA HOJE OU AMANHÃ
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans text-gray-800 selection:bg-blue-200">
      <div className="w-full max-w-[480px] p-5 flex flex-col relative min-h-screen">
        {renderProgressBar()}
        <div className="flex-1 flex flex-col justify-center pb-12">
          {renderContent()}
        </div>
        
        <div className="mt-auto pt-8 pb-4 text-center text-[11px] text-gray-400 border-t border-gray-100">
          © 2026 - Criado via inlead.digital | Central de anúncios
        </div>
      </div>
    </div>
  );
}
